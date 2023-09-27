import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery");
  if (isConnected) {
    console.log("mongo is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbname: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("mongo connected succesfully");
  } catch (error) {
    console.log(error);
    console.log(process.env.MONGODB_URI);
  }
};
