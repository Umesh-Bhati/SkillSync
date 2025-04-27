import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export class EmbeddingService {
  // Generate embeddings for text using OpenAI
  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: text
      });
      
      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generating embedding:', error);
      return [];
    }
  }

  // Calculate similarity between two embeddings (cosine similarity)
  calculateSimilarity(embedding1: number[], embedding2: number[]): number {
    // Ensure both embeddings have the same length
    if (embedding1.length !== embedding2.length) {
      throw new Error('Embeddings must have the same dimensions');
    }
    
    // Calculate dot product
    const dotProduct = embedding1.reduce(
      (sum, value, i) => sum + value * embedding2[i], 
      0
    );
    
    // Calculate magnitudes
    const magnitude1 = Math.sqrt(
      embedding1.reduce((sum, val) => sum + val * val, 0)
    );
    
    const magnitude2 = Math.sqrt(
      embedding2.reduce((sum, val) => sum + val * val, 0)
    );
    
    // Cosine similarity
    return dotProduct / (magnitude1 * magnitude2);
  }
}

export default new EmbeddingService();