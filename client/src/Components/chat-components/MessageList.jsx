import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import PollView from "./PollView";
import { toast } from "react-toastify";

const MessageList = ({ socket, messages,setMessages, loggedInUserId, loading }) => {
  const messagesEndRef = useRef(null);
  const handleVote = async (pollId, option) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/vote",
        { pollId, option },
        { withCredentials: true }
      );
      console.log("THis is res",res)
      if (res) {
        socket.emit("voteCast", res);
              const response = await axios.get(
                "http://localhost:3000/auth/getMessages",
                {
                  withCredentials: true,
                }
              );
              setMessages(response.data.allMessages);
            }
      toast.success("Vote registered successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred!";
      toast.error(errorMessage);
      console.error("Error submitting vote:", error);
    }
  };
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="message-list-container">
      {loading ? (
        <div className="loading-screen">
          <div className="blur-background"></div>
          <img src="/spinner.svg" className="spinner" />
        </div>
      ) : (
        <div className="message-list">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`message-card ${
                message.senderId._id === loggedInUserId ? "sent" : "received"
              }`}
            >
              <div className="message-header">
                <span className="message-username">
                  {message.senderId.username||message.username}
                </span>
              </div>
              {message.type === "poll" ? (
                <PollView poll={message} onVote={handleVote} />
              ) : (
                <div className="message-body">{message.message}</div>
              )}
              <span className="message-time font-thin text-xs ">
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default MessageList;
