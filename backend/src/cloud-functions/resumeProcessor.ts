import { Storage } from '@google-cloud/storage';
import { PubSub } from '@google-cloud/pubsub';
import { OpenAI } from 'openai';
import * as functions from '@google-cloud/functions-framework';

// Initialize clients
const storage = new Storage();
const pubsub = new PubSub();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const RESUME_TOPIC = 'resume-analysis-topic';
const JOB_MATCH_TOPIC = 'job-match-topic';

functions.cloudEvent('processResume', async (cloudEvent: any) => {
  try {
    console.log('Processing resume upload event:', cloudEvent.id);
    
    // Extract bucket and file information from the event
    const bucket = cloudEvent.data.bucket;
    const filePath = cloudEvent.data.name;
    const userId = filePath.split('/')[0]; // Assuming format: userId/resume.pdf
    
    console.log(`Processing resume for user ${userId} from ${bucket}/${filePath}`);
    
    // Download the file from Cloud Storage
    const [fileContent] = await storage.bucket(bucket).file(filePath).download();
    const resumeText = fileContent.toString('utf-8');
    
    // Extract relevant information from resume using LLM
    const resumeData = await extractResumeInfo(resumeText);
    
    // Store processed data
    const processedFilePath = `${userId}/processed_resume.json`;
    await storage.bucket(bucket).file(processedFilePath).save(
      JSON.stringify(resumeData),
      { contentType: 'application/json' }
    );
    
    // Publish event to trigger the next step in the pipeline
    await publishResumeProcessedEvent(userId, processedFilePath);
    
    console.log(`Resume processing complete for user ${userId}`);
  } catch (error) {
    console.error('Error processing resume:', error);
  }
});

/**
 * Cloud Function triggered by Pub/Sub when a job description is added
 * Demonstrates pub/sub messaging in event-driven architecture
 */
functions.cloudEvent('matchJobToResumes', async (cloudEvent: any) => {
  try {
    const messageData = JSON.parse(
      Buffer.from(cloudEvent.data.message.data, 'base64').toString()
    );
    
    const { jobId, jobDescription } = messageData;
    console.log(`Processing job match for job ID ${jobId}`);
    
    // Get list of all processed resumes
    const [files] = await storage.bucket('resume-bucket').getFiles({
      prefix: 'processed',
      delimiter: '/'
    });
    
    const matchResults = [];
    
    // For each resume, calculate match score
    for (const file of files) {
      const [resumeData] = await file.download();
      const resumeJson = JSON.parse(resumeData.toString());
      const userId = file.name.split('/')[0];
      
      // Calculate match score (using the embedding service)
      const matchScore = await calculateMatchScore(resumeJson, jobDescription);
      
      matchResults.push({
        userId,
        jobId,
        score: matchScore,
        timestamp: new Date().toISOString()
      });
    }
    
    // Store match results
    const resultsPath = `jobs/${jobId}/match_results.json`;
    await storage.bucket('job-matches').file(resultsPath).save(
      JSON.stringify(matchResults),
      { contentType: 'application/json' }
    );
    
    // Publish event for notification service
    await publishMatchCompletedEvent(jobId, matchResults);
    
    console.log(`Job matching complete for job ID ${jobId}`);
  } catch (error) {
    console.error('Error matching job to resumes:', error);
  }
});


functions.http('uploadJobDescription', async (req, res) => {
  try {
    const { jobId, title, company, description, requirements } = req.body;
    
    if (!jobId || !description) {
      res.status(400).send('Missing required fields');
      return;
    }
    
    // Store job description
    const jobData = { jobId, title, company, description, requirements };
    await storage.bucket('job-descriptions').file(`${jobId}.json`).save(
      JSON.stringify(jobData),
      { contentType: 'application/json' }
    );
    
    // Publish event to trigger matching process
    await pubsub.topic(JOB_MATCH_TOPIC).publish(
      Buffer.from(JSON.stringify({ jobId, jobDescription: jobData }))
    );
    
    res.status(200).send({
      message: 'Job description uploaded and matching process initiated',
      jobId
    });
  } catch (error) {
    console.error('Error uploading job description:', error);
    res.status(500).send('Internal server error');
  }
});


async function extractResumeInfo(resumeText: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'Extract structured information from the resume text. Return only a JSON object with the following keys: skills (array), experience (array of objects with company, title, startDate, endDate, description), education (array), projects (array), and a brief summary.'
      },
      {
        role: 'user',
        content: resumeText
      }
    ],
    response_format: { type: 'json_object' }
  });
  
  return JSON.parse(response.choices[0].message.content || '{}');
}

async function calculateMatchScore(resumeData: any, jobDescription: any) {
  // Implementation would use the embedding service from previous code
  // For demo purposes, we'll return a random score
  return Math.random() * 10;
}

/**
 * Helper function to publish resume processed event
 */
async function publishResumeProcessedEvent(userId: string, filePath: string) {
  await pubsub.topic(RESUME_TOPIC).publish(
    Buffer.from(JSON.stringify({ userId, filePath }))
  );
}

/**
 * Helper function to publish match completed event
 */
async function publishMatchCompletedEvent(jobId: string, matchResults: any[]) {
  await pubsub.topic('match-notification-topic').publish(
    Buffer.from(JSON.stringify({ jobId, matchResults }))
  );
}
