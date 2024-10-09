import express from 'express'
const app = express();
import 'dotenv/config'
import mongoose from 'mongoose';
import { connectDb } from './config/db.js';
import userRouter from './router/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import bodyParser from 'body-parser';
const PORT = 8080;
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}
))
app.use(bodyParser.json({ limit: '10mb' })); // For JSON requests
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(cookieParser())
connectDb()

// API
app.use("/api",userRouter)
// app.use('/',(req,res,next)=>{
//     res.send(`Server is up and running on port http://loaclhost:${PORT}`)
// })
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});