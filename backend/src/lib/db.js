import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected", con.connection.host);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
