import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../src/index.css";
import ChatHeader from "./chat-components/ChatHeader";
import MessageList from "./chat-components/MessageList";
import MessageInput from "./chat-components/MessageInput";
import io from "socket.io-client";

const ChatRoom = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/auth/getMessages",
          {
            withCredentials: true,
          }
        );
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

  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      withCredentials: true,
    });
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/verify")
      .then((res) => {
        if (!res.data.status) {
          handleLogout();
        }
      })
      .catch((err) => {
        console.error("Error during verification:", err);
        handleLogout();
      });
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/auth/logout")
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
        } else {
          console.log("Logout failed:", res.data.message);
        }
      })
      .catch((err) => {
        console.error("Error during logout:", err);
      });
  };

  return (
    <div className="background">
      <ChatHeader />
      <MessageList socket={socket} messages={messages} setLoading={loading} loggedInUserId={loggedInUserId} loading={loading}/>
      <MessageInput socket={socket} setMessages={setMessages} />
    </div>
  );
};

export default ChatRoom;
