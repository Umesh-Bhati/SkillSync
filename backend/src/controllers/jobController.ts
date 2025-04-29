import { Request, Response } from 'express';
import LLMService from '../services/llmService';
import JobMatchService, { JobDescription } from '../services/jobMatchService';

export const analyzeJobDescription = async (req: Request, res: Response) => {
  try {
    const { jobDescription } = req.body;
    
    if (!jobDescription) {
      res.status(400).json({ message: 'Job description is required' });
      return;
    }
    
    // Generate interview questions based on job description
    const questions = await LLMService.generateInterviewQuestions(jobDescription);
    
    res.json({
      questions,
      message: 'Job description analyzed successfully'
    });
  } catch (error) {
    console.error('Error analyzing job description:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const evaluateAnswer = async (req: Request, res: Response) => {
  try {
    const { question, answer } = req.body;
    
    if (!question || !answer) {
      res.status(400).json({ 
        message: 'Question and answer are required' 
      });
      return;
    }
    
    // Evaluate the answer
    const evaluation = await LLMService.evaluateAnswer(question, answer);
    
    res.json({
      evaluation,
      message: 'Answer evaluated successfully'
    });
  } catch (error) {
    console.error('Error evaluating answer:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const matchResumeToJob = async (req: Request, res: Response) => {
  try {
    const { resume, jobDescription } = req.body;
    
    if (!resume || !jobDescription) {
      res.status(400).json({ 
        message: 'Resume and job description are required' 
      });
      return;
    }
    
    // Parse job description
    const parsedJob: JobDescription = {
      title: jobDescription.title || 'Backend Developer',
      company: jobDescription.company || 'Unknown',
      description: jobDescription.description || '',
      requirements: jobDescription.requirements || []
    };
    
    // Match resume to job
    const matchResult = await JobMatchService.matchResumeToJob(resume, parsedJob);
    
    res.json({
      match: matchResult,
      message: 'Resume matched to job successfully'
    });
  } catch (error) {
    console.error('Error matching resume to job:', error);
    res.status(500).json({ message: 'Server error' });
  }
};