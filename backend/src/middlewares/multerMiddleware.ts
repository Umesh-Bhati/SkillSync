import multer from 'multer';
import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

console.log("GCLOUD_PROJECT ", process.env.GCLOUD_PROJECT);
console.log("GCS_BUCKET ", process.env.GCS_BUCKET);

// 1. Local disk storage for multer (temporary)
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const upload = multer({ storage: diskStorage });

// 2. GCS client for manual upload
export const gcs = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.GCLOUD_KEYFILE,
});
