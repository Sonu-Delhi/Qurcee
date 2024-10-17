import mongoose from "mongoose";
const PORT = 8080

export const connectDb = async()=>{
    await mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("Db connected");
        console.log(`Server is up and running on port http://loaclhost:${PORT}`);
        
    })
}