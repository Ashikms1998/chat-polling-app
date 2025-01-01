import axios from "axios";
import React, { useState } from "react";
import { FaSquarePollHorizontal } from "react-icons/fa6";
import PollModal from "./PollModal";

const MessageInput = ({ socket, setMessages }) => {
  const [message, setMessage] = useState("");
  const [isPollModalOpen, setIsPollModalOpen] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/sendMessage",
        { message },
        { withCredentials: true }
      );
      const savedMessage = response.data.savedMessage;
      if (savedMessage) {
        socket.emit("sendMessage", savedMessage);
        const response = await axios.get(
          "http://localhost:3000/auth/getMessages",
          {
            withCredentials: true,
          }
        );
        setMessages(response.data.allMessages);
        setMessage("");
      } else {
        console.error("Message sending failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleCreatePoll = async (question, options) => {
    try {
      console.log("Handle create poll")
      const response = await axios.post(
        "http://localhost:3000/auth/pollData",
        { question, options },
        { withCredentials: true }
      );

      const res = response.data;

      console.log("This is what the res", res);

      if (res) {
        socket.emit("sendMessage", res);
        const response = await axios.get(
          "http://localhost:3000/auth/getMessages",
          {
            withCredentials: true,
          }
        );
        setMessages(response.data.allMessages);
        setMessage("");
      } else {
        console.error("Poll creation failed:", response.data.message);
      }
      setIsPollModalOpen(false);
    } catch (error) {
      console.error("Error creating poll:", error);
    }
  };

  return (
    <>
      <div className="message-input fixed bottom-0 left-0 w-full flex items-center p-3 bg-black">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-md"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          size="icon"
          variant="ghost"
          onClick={() => setIsPollModalOpen(true)}
          className="flex-shrink-0 relative"
        >
          <FaSquarePollHorizontal className="text-2xl text-white ml-4" />
        </button>
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Send
        </button>
        <PollModal
          isOpen={isPollModalOpen}
          onClose={() => setIsPollModalOpen(false)}
          onCreatePoll={handleCreatePoll}
        />
      </div>
    </>
  );
};
export default MessageInput;
