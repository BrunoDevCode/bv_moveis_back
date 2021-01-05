import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '../../.env' });

export const {
  MONGO_URI, BUCKET_NAME, STORAGE_TYPE, APP_URL,
}: any = process.env;
