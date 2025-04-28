import { Storage } from '@google-cloud/storage';
import multer, { StorageEngine } from 'multer';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { Request } from 'express';
import 'dotenv/config';


const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.GCLOUD_KEYFILE,
});


if (!process.env.GCS_BUCKET) {
  throw new Error('GCS_BUCKET environment variable is not set. Please define your Google Cloud Storage bucket name in your environment.');
}
const bucket = storage.bucket(process.env.GCS_BUCKET);

export const MAX_RESUME_FILE_SIZE = 2 * 1024 * 1024; // 2MB

// Multer disk storage for temp files
const tempStorage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, os.tmpdir());
  },
  filename: function (_req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
  
});

// Use disk storage for multer
export const upload = multer({
  storage: tempStorage,
  limits: { fileSize: MAX_RESUME_FILE_SIZE },
});

// Helper to upload local file to GCS after parsing
export async function uploadFileToGCS(localFilePath: string, mimetype: string): Promise<{ publicUrl: string, gcsPath: string }> {
  const blob = bucket.file(path.basename(localFilePath));
  await new Promise((resolve, reject) => {
    const gcsStream = fs.createReadStream(localFilePath).pipe(blob.createWriteStream({
      resumable: false,
      contentType: mimetype,
    }));
    gcsStream.on('error', reject);
    gcsStream.on('finish', resolve);
  });
  return {
    publicUrl: `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${blob.name}`,
    gcsPath: blob.name,
  };
}