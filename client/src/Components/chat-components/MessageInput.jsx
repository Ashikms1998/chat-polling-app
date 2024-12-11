import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSquarePollHorizontal } from "react-icons/fa6";
import PollModal from "./PollModal";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [showPollModal, setShowPollModal] = useState(false);
  const [isPollModalOpen, setIsPollModalOpen] = useState(false);
  const handleSend = () => {
    if (message.trim()) {
      axios
        .post(
          "http://localhost:3000/auth/sendMessage",
          { message },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log("Message sent successfully:", response.data);
          setMessage("");
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }
  };

  const handleCreatePoll = (question, options) => {
    console.log('Creating poll:', { question, options })
    axios.post("http://localhost:3000/auth/pollData",{question, options},{
      withCredentials:true
    })
    setIsPollModalOpen(false)
  }

  return (
    <>
      <div className="message-input fixed bottom-0 left-0 w-full flex items-center p-3 bg-sky-500">
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
          <FaSquarePollHorizontal className="text-2xl text-black" />
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
