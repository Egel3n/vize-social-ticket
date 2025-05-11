import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL;

export const connectMongoose = async () => {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(MONGODB_URI, {
    dbName: "prototypeVize",
  });

  console.log("✅ Mongoose connected");
};
