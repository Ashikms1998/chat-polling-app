import mongoose from "mongoose";

const PollSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    votes: { type: Map, of: Number, default: {} },
    voters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
  },{ timestamps: true });
  
  const PollModel = mongoose.model("Poll", PollSchema);
  export {PollModel as Poll}