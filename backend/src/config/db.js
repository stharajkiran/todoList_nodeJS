
import mongoose from "mongoose"

export const connectDB = async ( ) =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
        }
    catch (error){
        console.log("Error connecting to the mongoDB", error);
        process.exit(1); // exit with failure
    }
}