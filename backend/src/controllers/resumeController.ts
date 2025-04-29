import { Request, Response } from 'express';
import { parseResumeText } from '../services/resumeParserService';
import { uploadFileToGCS } from '../middlewares/multerMiddleware';
import { analyzeResumeAndJDWithGroq } from '../services/groqService';

const TOKEN_QUOTA_PER_IP = 5000;

export const analyzeResume = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
    const resumeFilePath = req.file.path;
    const resumePublicUrl = (req.file as any).publicUrl;
    const jobDescription = req.body.jobDescription;
    if (!jobDescription) {
      res.status(400).json({ error: 'Job description is required' });
      return;
    }
    let resumeText: string;
    const fs = await import('fs');
    if (resumeFilePath && fs.existsSync(resumeFilePath)) {
      resumeText = await parseResumeText(resumeFilePath);
      await uploadFileToGCS(resumeFilePath, (req.file as any).mimetype);
      try {
        await import('fs/promises').then(fs => fs.unlink(resumeFilePath));
      } catch (err) {
        console.error('Failed to delete uploaded resume:', err);
      }
    } else if (resumePublicUrl) {
      const axios = (await import('axios')).default;
      const response = await axios.get(resumePublicUrl, { responseType: 'arraybuffer' });
      const fileBuffer = Buffer.from(response.data);
      const ext = resumePublicUrl.split('.').pop()?.toLowerCase();
      if (ext === 'pdf') {
        const pdfParse = (await import('pdf-parse')).default;
        const pdfData = await pdfParse(fileBuffer);
        resumeText = pdfData.text;
      } else if (ext === 'docx') {
        const mammoth = (await import('mammoth')).default;
        const result = await mammoth.extractRawText({ buffer: fileBuffer });
        resumeText = result.value;
      } else {
        throw new Error('Unsupported file type');
      }
    } else {
      throw new Error('No uploaded file found');
    }

    const result = await analyzeResumeAndJDWithGroq(resumeText, jobDescription);
    const usageDoc = (req as any).tokenUsageDoc;
    let tokensUsed = 0;
    if (result && result.usage && typeof result.usage.total_tokens === 'number') {
      tokensUsed = result.usage.total_tokens;
    } else {
      tokensUsed = Math.ceil((resumeText.length + jobDescription.length) / 4);
    }
    usageDoc.used += tokensUsed;
    await usageDoc.save();

     res.json({
      resumeUrl: resumePublicUrl || resumeFilePath,
      ...result,
      tokenQuota: TOKEN_QUOTA_PER_IP,
      tokensUsed: usageDoc.used,
      tokensThisRequest: tokensUsed,
    });
    return;
  } catch (error) {
    console.error('Error in /analyze-resume:', error);
     res.status(500).json({ error: 'Internal server error', details: error instanceof Error ? error.message : error });
     return;
  }
};
