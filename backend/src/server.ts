import app from './app';
import dotenv from 'dotenv';
import { connectDB } from './configs/db';

dotenv.config();

const PORT = process.env.PORT || 8080;

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
