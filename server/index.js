import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
dotenv.config();

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/auth", userRoutes);
mongoose
  .connect(
    "mongodb+srv://ashikms1998:i5m8M2kAKSuhGJku@chat-application.hkt5w.mongodb.net/chatapp-cluster?retryWrites=true&w=majority&appName=chat-application"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

io.on("connection", (socket) => {
  socket.on("sendMessage", (message) => {
    console.log("Message received", message);
    socket.broadcast.emit("receiveMessage", message);
    
  });
socket.on("voteCast",(res)=>{
  console.log("voteCast received", res.data.updatedPoll);
  socket.broadcast.emit("pollUpdated", res.data.updatedPoll)
})

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}...`);
});
 