import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    senderId:{type:mongoose.Types.ObjectId, ref:'User', required:true},
    username:{type:String, ref:'User', required:false},
    message:{ type: String, required: false },
    type: { type: String, enum: ["message", "poll"], required: true },
    createdAt:{ type: Date, default: Date.now },
    pollId: { type: mongoose.Schema.Types.ObjectId, ref: "Poll" },
},{ timestamps: true })

const MessageModel = mongoose.model('Message', messageSchema)
export {MessageModel as Message}