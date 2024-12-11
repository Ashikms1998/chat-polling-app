import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/auth/getMessages",
          {
            withCredentials: true,
          }
        );
        console.log(response);
        const userId = localStorage.getItem("userId");
        setLoggedInUserId(userId);
        setMessages(response.data.allMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

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
              <div className="message-body">{message.message}</div>
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
