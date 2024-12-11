import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import "./index.css";
import Login from "./Components/Login";
import ChatRoom from "./Components/ChatRoom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path = "/login" element={<Login/>}></Route>
          <Route path = "/chat-room" element={<ChatRoom/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
