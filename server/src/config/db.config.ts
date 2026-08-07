
import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/pairspace';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error;
  }
};
