import EmbeddingService from '../utils/embeddings';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export interface JobDescription {
  title: string;
  company: string;
  description: string;
  requirements: string[];
  embedding?: number[];
}

export class JobMatchService {
  // Extract technical skills from text using LLM
  async extractSkills(text: string): Promise<string[]> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert technical recruiter who specializes in identifying technical skills in text. Extract all technical skills, tools, frameworks, programming languages, and technologies mentioned in the provided text. Return only a JSON array of strings with no additional text.'
          },
          {
            role: 'user',
            content: text
          }
        ],
        response_format: { type: "json_object" }
      });
      
      const content = response.choices[0]?.message?.content;
      if (!content) return [];
      
      try {
        const parsedContent = JSON.parse(content);
        return Array.isArray(parsedContent.skills) ? parsedContent.skills : [];
      } catch (parseError) {
        console.error('Error parsing skills JSON:', parseError);
        // Fallback parsing method
        const skillMatches = content.match(/["']([^"']+)["']/g);
        return skillMatches 
          ? skillMatches.map(match => match.replace(/["']/g, '').trim())
          : [];
      }
    } catch (error) {
      console.error('Error extracting skills:', error);
      return [];
    }
  }

  // Match a resume against a job description using embeddings and LLM
  async matchResumeToJob(resume: string, jobDescription: JobDescription): Promise<{
    score: number;
    matchedSkills: string[];
    missingSkills: string[];
    relevanceAnalysis: string;
  }> {
    try {
      // Generate embeddings
      const resumeEmbedding = await EmbeddingService.generateEmbedding(resume);
      
      // Get or generate job embedding
      let jobEmbedding;
      if (jobDescription.embedding) {
        jobEmbedding = jobDescription.embedding;
      } else {
        jobEmbedding = await EmbeddingService.generateEmbedding(
          `${jobDescription.title} ${jobDescription.description}`
        );
      }
      
      // Calculate semantic similarity
      const similarityScore = EmbeddingService.calculateSimilarity(
        resumeEmbedding, 
        jobEmbedding
      );
      
      // Extract skills using LLM
      const resumeSkills = await this.extractSkills(resume);
      const jobSkills = await this.extractSkills(
        `${jobDescription.title} ${jobDescription.description} ${jobDescription.requirements.join(' ')}`
      );
      
      // Find matched and missing skills
      const matchedSkills = resumeSkills.filter(skill => 
        jobSkills.some(jobSkill => 
          jobSkill.toLowerCase() === skill.toLowerCase()
        )
      );
      
      const missingSkills = jobSkills.filter(skill => 
        !resumeSkills.some(resumeSkill => 
          resumeSkill.toLowerCase() === skill.toLowerCase()
        )
      );
      
      // Get detailed analysis of the match
      const relevanceAnalysis = await this.getRelevanceAnalysis(
        resume, 
        jobDescription,
        matchedSkills,
        missingSkills
      );
      
      return {
        score: similarityScore * 10, // Scale to 0-10
        matchedSkills,
        missingSkills,
        relevanceAnalysis
      };
    } catch (error) {
      console.error('Error matching resume to job:', error);
      return { 
        score: 0, 
        matchedSkills: [], 
        missingSkills: [],
        relevanceAnalysis: 'Error analyzing resume'
      };
    }
  }
  
  // Get detailed analysis of match between resume and job
  private async getRelevanceAnalysis(
    resume: string, 
    jobDescription: JobDescription,
    matchedSkills: string[],
    missingSkills: string[]
  ): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert technical recruiter analyzing the fit between a candidate resume and job description. Provide a balanced, fair analysis of the match focusing on technical skills and experience.'
          },
          {
            role: 'user',
            content: `
              Job Title: ${jobDescription.title}
              Company: ${jobDescription.company}
              Job Description: ${jobDescription.description}
              
              Resume: ${resume.substring(0, 1000)}... (truncated)
              
              Matched Skills: ${matchedSkills.join(', ')}
              Missing Skills: ${missingSkills.join(', ')}
              
              Provide a concise analysis (3-5 sentences) of how well this candidate's skills match the job requirements and what areas they should focus on to improve their chances.
            `
          }
        ]
      });
      
      return response.choices[0]?.message?.content || 
        'Unable to generate analysis';
    } catch (error) {
      console.error('Error generating relevance analysis:', error);
      return 'Error generating analysis';
    }
  }
}

export default new JobMatchService();