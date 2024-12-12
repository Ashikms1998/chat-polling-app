import express from 'express'
const router = express.Router();
import { userSignUp, userLogin,userLogout,verifyToken,sendMessage,fetchMessages,pollData,addVote } from '../controller/userAuth.js';

router.post('/signup',userSignUp)
router.post('/login', userLogin)
router.get('/verify',verifyToken)
router.get('/logout',userLogout)
router.post('/sendMessage',sendMessage)
router.get('/getMessages',fetchMessages)
router.post('/pollData',pollData)
router.post("/vote",addVote)
export default router