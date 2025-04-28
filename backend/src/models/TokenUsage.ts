import mongoose, { Document, Schema } from 'mongoose';

export interface ITokenUsage extends Document {
  ip: string;
  used: number;
  lastUsed: Date;
}

const TokenUsageSchema = new Schema<ITokenUsage>({
  ip: { type: String, required: true, unique: true },
  used: { type: Number, default: 0 },
  lastUsed: { type: Date, default: Date.now },
});

export const TokenUsage = mongoose.model<ITokenUsage>('TokenUsage', TokenUsageSchema);
