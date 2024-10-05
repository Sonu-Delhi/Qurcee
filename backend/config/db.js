import mongoose from "mongoose";
const PORT = 8080

export const connectDb = async()=>{
    await mongoose.connect('mongodb+srv://root:root12345@cluster0.0oubsko.mongodb.net/').then(()=>{
        console.log("Db connected");
        console.log(`Server is up and running on port http://loaclhost:${PORT}`);
        
    })
}