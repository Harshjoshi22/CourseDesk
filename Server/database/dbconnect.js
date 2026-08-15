import mongoose from "mongoose";
const connectDB = async () => {
    try {
         await mongoose.connect(process.env.MONGO_URI);
          
        console.error(`MongoDB Connected`);
    } catch (error) {
        console.error("Error",error);
    } }
    export default connectDB;