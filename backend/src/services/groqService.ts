import axios from 'axios';

type GroqModel = 'llama3-70b-8192' | 'mixtral-8x7b-32768' | 'gemma-7b-it';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  console.warn('Warning: GROQ_API_KEY is not set in environment variables.');
}

export async function extractSkillsFromGroq(text: string, model: GroqModel = 'llama3-70b-8192'): Promise<string[]> {
  const prompt = `Extract all technical and soft skills from the following text. Return the result as a JSON array of skill names.\n\nText:\n${text}`;

  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model,
        messages: [
          { role: 'system', content: 'You are a helpful assistant for skill extraction.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 512,
        temperature: 0.2,
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Try to parse the assistant's reply as JSON
    const content = response.data.choices[0].message.content;
    console.log('Groq raw response:', content);
    try {
      // Try direct JSON parse
      const skills = JSON.parse(content);
      if (Array.isArray(skills)) {
        return skills;
      }
    } catch (e) {
      // Try to extract JSON array from text
      const match = content.match(/\[.*?\]/s);
      if (match) {
        try {
          const arr = JSON.parse(match[0]);
          if (Array.isArray(arr)) {
            return arr;
          }
        } catch (e2) {
          // continue to fallback
        }
      }
      // Fallback: extract quoted phrases as skills
      const skillMatches = content.match(/["'`](.*?)["'`]/g);
      if (skillMatches) {
        return skillMatches.map((s: string) => s.replace(/["'`]/g, '').trim());
      }
    }
    throw new Error('Groq response could not be parsed as a skill array');
  } catch (err: any) {
    console.error('Groq API error:', err.message || err);
    // Fallback: return empty or mock
    return [];
  }
}


export async function analyzeResumeAndJDWithGroq(resumeText: string, jobDescription: string, model: GroqModel = 'llama3-70b-8192') {
  const prompt = `Given the following resume and job description, extract:\n\n- resumeSkills: All technical and soft skills found in the resume (as a JSON array).\n- jobSkills: All skills required by the job description (as a JSON array).\n- matchedSkills: Skills from jobSkills that are present in resumeSkills (as a JSON array).\n- missingSkills: Skills from jobSkills that are NOT present in resumeSkills (as a JSON array).\n- matchPercentage: Percentage of jobSkills present in resumeSkills (as a number between 0 and 100).\n\nReturn your answer as a single JSON object with these properties.\n\nResume:\n${resumeText}\n\nJob Description:\n${jobDescription}`;

  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model,
        messages: [
          { role: 'system', content: 'You are a helpful assistant for skill extraction and matching.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 1024,
        temperature: 0.2,
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.choices[0].message.content;
    console.log('Groq analyzeResumeAndJD raw response:', content);
    try {
      // Try direct JSON parse
      const obj = JSON.parse(content);
      if (obj && typeof obj === 'object') {
        return obj;
      }
    } catch (e) {
      // Try to extract JSON object from text
      const match = content.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          const obj = JSON.parse(match[0]);
          if (obj && typeof obj === 'object') {
            return obj;
          }
        } catch (e2) {
        }
      }
    }
    throw new Error('Groq response could not be parsed as a JSON object');
  } catch (err: any) {
    console.error('Groq API error:', err.message || err);
    return {
      resumeSkills: [],
      jobSkills: [],
      matchedSkills: [],
      missingSkills: [],
      matchPercentage: 0,
      error: err.message || err
    };
  }
}
