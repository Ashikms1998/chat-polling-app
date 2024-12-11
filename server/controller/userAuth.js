import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { Message } from "../models/Message.js";
import jwt from "jsonwebtoken";

export const userSignUp = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "user already exist" });
  }

  const salt = 10;
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });
  await newUser.save();
  return res.json({ status: true, message: "user registration successfull" });
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "User not registered" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "Password is incorrect" });
  }
  const token = jwt.sign(
    { username: user.username, userid: user.id },
    process.env.KEY,
    {
      expiresIn: "1h",
    }
  );
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
  return res.json({ status: true, message: "login successfully",userId: user.id });
};

export const userLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ status: true, message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", err);
    res.status(500).json({ status: false, message: "Logout failed" });
  }
};

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false, message: "no token" });
  }
  await verifyUser(req, res, next);
  return res.json({ status: true, message: "authorized" });
};

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    const decoded = await jwt.verify(token, process.env.KEY);
    next();
  } catch (error) {
    return res.json(error);
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.KEY);
    if (!decoded.userid) {
      return res.status(400).json({ error: "Invalid token." });
    }
    const newMessage = new Message({
      senderId: decoded.userid,
      message,
    });
    await newMessage.save();
    res
      .status(201)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "An error occurred while sending the message." });
  }
};

export const fetchMessages = async(req,res)=>{
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.KEY);
    if (!decoded.userid) {
      return res.status(400).json({ error: "Invalid token." });
    }
    const allMessages = await Message.find().populate('senderId','username').sort({ createdAt: 1 }); 
    console.log(allMessages,"all message");
    return res.status(201).json({message:"Message retrival successfull",allMessages})

  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "An error occurred while fetching messages." });
  
  }
}

export const pollData = async(req,res)=>{
  try {
    const token  = req.cookies.token
    const decoded = jwt.verify(token, process.env.KEY);
    if (!decoded.userid) {
      return res.status(400).json({ error: "Invalid token." });
    }
    
  } catch (error) {
    console.error("Error saving poll data:", error);
    res.status(500).json({ error: "An error occurred while saving poll data." });
  }
}