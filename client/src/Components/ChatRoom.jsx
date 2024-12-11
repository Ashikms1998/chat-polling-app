import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../src/index.css";
import ChatHeader from "./chat-components/ChatHeader";
import MessageList from "./chat-components/MessageList";
import MessageInput from "./chat-components/MessageInput";

const ChatRoom = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/verify")
      .then((res) => {
        console.log("getting in useeffect", res.data);
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
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatRoom;
