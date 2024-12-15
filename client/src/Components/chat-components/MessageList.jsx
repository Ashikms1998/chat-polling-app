import React, { useEffect, useState } from "react";
import axios from "axios";
import PollView from "./PollView";
import { toast } from "react-toastify";

const MessageList = ({ socket, messages, loggedInUserId, loading }) => {
  
  const handleVote = async (pollId, option) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/vote",
        { pollId, option },
        { withCredentials: true }
      );
      toast.success("Vote registered successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred!";
      toast.error(errorMessage);
      console.error("Error submitting vote:", error);
    }
  };

  return (
    <div>
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
                  {message.senderId._id != loggedInUserId
                    ? message.senderId.username
                    : ""}
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
        </div>
      )}
    </div>
  );
};

export default MessageList;
