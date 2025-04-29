import { Storage } from '@google-cloud/storage';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import os from 'os';
import 'dotenv/config';


const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
});


if (!process.env.GCS_BUCKET) {
  throw new Error('GCS_BUCKET environment variable is not set. Please define your Google Cloud Storage bucket name in your environment.');
}
const bucket = storage.bucket(process.env.GCS_BUCKET);

export const MAX_RESUME_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const tempStorage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, os.tmpdir());
  },
  filename: function (_req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
  
});

export const upload = multer({
  storage: tempStorage,
  limits: { fileSize: MAX_RESUME_FILE_SIZE },
});

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