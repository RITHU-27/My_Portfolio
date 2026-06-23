import mongoose from "mongoose";

export async function connectDB(uri) {
  if (!uri) {
    throw new Error("MONGO_URI is not defined");
  }
  mongoose.set("strictQuery", true);
  
  const conn = await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 10000,
  });
  
  console.log(`MongoDB connected: ${conn.connection.host}`);
  return conn;
}