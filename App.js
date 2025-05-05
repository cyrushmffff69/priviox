import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";         // <-- ./ not ../
import Chat from "./Pages/Chat";          // <-- ./ not ../
import Register from "./Pages/Register";  // <-- ./ not ../
import AdminPanel from "./Pages/AdminPanel"; // <-- ./ not ../
import ForgetPassword from "./Pages/ForgetPassword";

function App() {
  const [model, setModel] = useState("openchat/openchat-7b");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat model={model} setModel={setModel} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPanel />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
     </Routes>
    </Router>
  );
}

export default App;
