import { extractSkillsFromGroq } from './groqService';

/**
 * Extract skills from a job description using Groq API.
 * @param jobDescription string
 * @returns Promise<string[]>
 */
export async function extractSkillsFromJobDescription(jobDescription: string): Promise<string[]> {
  // Prompt Groq to extract required skills from the job description
  return extractSkillsFromGroq(jobDescription);
}
