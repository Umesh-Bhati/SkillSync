import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

import { extractSkillsFromGroq } from './groqService';

export const extractSkillsFromHuggingFace = async (text: string): Promise<string[]> => {
  // Now using Groq API for skill extraction
  return extractSkillsFromGroq(text);
};
