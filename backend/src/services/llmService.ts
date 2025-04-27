import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export class LLMService {
  // Generate interview questions based on job description
  async generateInterviewQuestions(jobDescription: string, count: number = 5): Promise<string[]> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert technical interviewer for tech companies. Generate specific technical interview questions.'
          },
          {
            role: 'user',
            content: `Generate ${count} technical interview questions for this job description: ${jobDescription}. Focus on Node.js, TypeScript, MongoDB, and LLM/NLP concepts.`
          }
        ],
        temperature: 0.7
      });
      
      const content = response.choices[0]?.message?.content;
      if (!content) return [];
      
      // Parse the response to extract individual questions
      const questions = content.split(/\d+\./).filter(q => q.trim().length > 0);
      return questions.map(q => q.trim());
    } catch (error) {
      console.error('Error generating interview questions:', error);
      return [];
    }
  }

  // Evaluate an interview answer
  async evaluateAnswer(question: string, answer: string): Promise<{
    score: number;
    feedback: string;
    suggestions: string[];
  }> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert technical interviewer evaluating candidate responses. Provide a score (1-10), feedback, and suggestions for improvement.'
          },
          {
            role: 'user',
            content: `Question: ${question}\n\nAnswer: ${answer}\n\nEvaluate this answer for a backend developer role.`
          }
        ]
      });
      
      const content = response.choices[0]?.message?.content;
      if (!content) {
        return { score: 0, feedback: '', suggestions: [] };
      }
      
      // This is simplified - in a real implementation you'd use a more robust parsing method
      const scoreMatch = content.match(/score:?\s*(\d+)/i);
      const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 5;
      
      // Extract feedback and suggestions (simplified implementation)
      const feedbackMatch = content.match(/feedback:?(.*?)(?=suggestions:|$)/is);
      const feedback = feedbackMatch ? feedbackMatch[1].trim() : '';
      
      const suggestionsMatch = content.match(/suggestions:?(.*?)$/is);
      const suggestionsText = suggestionsMatch ? suggestionsMatch[1].trim() : '';
      const suggestions = suggestionsText.split(/\d+\./).filter(s => s.trim().length > 0).map(s => s.trim());
      
      return { score, feedback, suggestions };
    } catch (error) {
      console.error('Error evaluating answer:', error);
      return { score: 0, feedback: 'Error evaluating answer', suggestions: [] };
    }
  }
}

export default new LLMService();