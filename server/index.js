import express from "express";
import dotenv from "dotenv";
dotenv.config()
import userRoutes from './routes/userRoutes.js'
import mongoose from "mongoose";
import cors from 'cors'
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json())
app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true
}))
app.use(cookieParser());
app.use("/auth",userRoutes)
mongoose.connect('mongodb+srv://ashikms1998:i5m8M2kAKSuhGJku@chat-application.hkt5w.mongodb.net/chatapp-cluster?retryWrites=true&w=majority&appName=chat-application')
.then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));


app.listen(process.env.PORT,()=>{
    console.log("Server is Running...");
})