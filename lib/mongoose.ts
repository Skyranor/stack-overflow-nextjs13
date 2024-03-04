import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    throw new Error("Missing MONGODB_URL");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "BaryshevOverflow",
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }

  if (isConnected) {
    console.log("MongoDB is already connected");
  }
};
