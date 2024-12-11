import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    senderId:{type:mongoose.Types.ObjectId, ref:'User', required:true},
    message:{ type: String, required: true },
    createdAt:{ type: Date, default: Date.now }
},{ timestamps: true })

const MessageModel = mongoose.model('Message', messageSchema)
export {MessageModel as Message}