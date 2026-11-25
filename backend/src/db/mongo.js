import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tasktimer';
mongoose.set('strictQuery', true);
mongoose.connection.on('connected', () => console.log('[MongoDB] connected'));
mongoose.connection.on('error', (err) => console.error('[MongoDB] error', err));
mongoose.connection.on('disconnected', () => console.warn('[MongoDB] disconnected'));
export async function connectMongo() {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000, socketTimeoutMS: 20000 });
}
