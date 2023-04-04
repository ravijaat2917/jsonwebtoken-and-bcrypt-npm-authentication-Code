import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.mongo_url;
    const options = {
      dbName: process.env.db_name,
    };

    const connection = await mongoose.connect(uri, options);
    // console.log(`DB connect Successfully`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
