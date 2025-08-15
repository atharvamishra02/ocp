import mongoose from 'mongoose';
import axios from 'axios';

const MONGODB_URI = process.env.MONGODB_URI;

// Check if we're running on the server side
const isServer = typeof window === 'undefined';

let cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

// Create an axios instance for API calls
export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function connectDB() {
  // If we're on the client side or in development without a MongoDB URI, return a mock connection
  if (!isServer || !MONGODB_URI) {
    console.warn('MongoDB connection skipped: ' + 
      (!isServer ? 'Running on client side' : 'No MONGODB_URI defined'));
    return { connection: { models: { User: { findById: () => Promise.resolve(null) } } } };
  }
  
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
