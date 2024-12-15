import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChatHeader = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios
      .get("http://localhost:3000/auth/logout")
      .then((res) => {
        console.log("this is the data", res.data);
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
    <div className="bg-black text-white text-center p-4 pt-10 flex justify-between items-center">
      <h1 className="text-lg font-bold">Voting Session</h1>
      <span className="text-sm">Online Users: 5</span>
      <button
        onClick={handleLogout}
        className="px-4 py-2 mt-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
      >
        Logout
      </button>
    </div>
  );
};

export default ChatHeader;
