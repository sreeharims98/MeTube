import mongoose from "mongoose";
import { config } from "./index.js";

export const connectDB = () => {
  mongoose
    .connect(config.MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((conn) => {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    })
    .catch((error) => {
      console.error(`MongoDB Error: ${error.message}`);
      process.exit(1);
    });
};
