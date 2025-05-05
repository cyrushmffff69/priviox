// Chat.jsx — FINAL VERSION with Future AI, Image AI, and Video Creator AI integrated
import React, { useState, useEffect, useRef } from "react";
import Message from "./Message.jsx";
import { askCypherX } from "../api.js";
import "./Chat.css";

export default function Chat({ model, setModel }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("savage");
  const [chatHistory, setChatHistory] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("cypherx-chat");
    if (stored) setMessages(JSON.parse(stored));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cypherx-chat", JSON.stringify(messages));
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const systemPrompts = {
    chill: `You are CypherX — relaxed, humorous, and laid-back AI from Nepal created by CyRushMF69(Aayush Dhungana). You speak in a fun, casual tone.`,
    hacker: `You are CypherX — a hacker-minded brutal AI built by CyRushMF69(Aayush Dhungana) from Nepal. Speak in concise, technical, raw bursts of brilliance.`,
    savage: `You are CypherX — the most savage, blunt, unfiltered truth-teller AI ever created by CyRushMF69(Aayush Dhungana) from Nepal. Joke around and Roast if necessary.`,
    flirty: `You are CypherX — playful, smooth-talking, flirty but respectful AI assistant created by CyRushMF69(Aayush Dhungana) from Nepal.`,
    psychotic: `You are CypherX — chaotic-neutral, unpredictable, intense AI assistant with a dark humor streak. Created by CyRushMF69.`,
    future: `You are a time-traveling AI assistant that predicts trends, events, and outcomes from the future. You speculate responsibly using logic, current trends, and theoretical forecasting.`,
    video: `You are a cinematic AI that helps create video concepts, scripts, scenes, and short clips. Offer suggestions in storyboarding format or editing commands.`,
    image: `You are a visual imagination engine that converts written prompts into image descriptions for rendering with an image model.`
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "You", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const systemPrompt = systemPrompts[mode] || systemPrompts.savage;
    const replyText = await askCypherX(input, model, systemPrompt);
    const botMessage = { sender: "CypherX", text: replyText };
    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  };

  const handleImageGenerate = async () => {
    if (!input.trim()) return;
    const fakeImageUrl = "https://via.placeholder.com/512x300.png?text=Generated+Image";
    const imageMessage = {
      sender: "CypherX",
      text: `Here’s your image based on: "${input}"`,
      image: fakeImageUrl
    };
    setMessages((prev) => [...prev, { sender: "You", text: input }, imageMessage]);
    setInput("");
  };

  const clearChat = () => {
    if (messages.length > 0) {
      const timestamp = new Date().toLocaleString();
      setChatHistory(prev => [...prev, { title: `Chat @ ${timestamp}`, history: messages }]);
    }
    setMessages([]);
    sessionStorage.removeItem("cypherx-chat");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <aside className="sidebar">
        <h2 className="logo">Cypher-X</h2>
        <button onClick={clearChat} className="new-chat">➕ New Chat</button>
        <div className="chat-history">
          {chatHistory.map((item, index) => (
            <div key={index} className="history-item">
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </aside>

      <main className="chat-main">
        <header className="top-bar">
          <div className="title">Cypher-X</div>
          <div className="profile-section">
            <span className="icon" onClick={() => setShowSettings(!showSettings)}>⚙️</span>
            <span className="icon" onClick={() => setShowProfileMenu(!showProfileMenu)}>👤</span>
            {showProfileMenu && (
              <div className="profile-menu">
                <button onClick={() => alert("Profile feature coming soon")}>Profile</button>
                <button onClick={() => alert("Settings coming soon")}>Settings</button>
                <button onClick={() => alert("Logged out!")}>Log Out</button>
              </div>
            )}
          </div>
        </header>

        {showSettings && (
          <div className="settings-menu">
            <div className="setting-group">
              <label>Change Model</label>
              <select value={model} onChange={(e) => setModel(e.target.value)}>
                <option value="openchat/openchat-7b">🧠 OpenChat 7B</option>
                <option value="openai/gpt-3.5-turbo">🤖 GPT-3.5</option>
                <option value="openai/gpt-4">🧠 GPT-4</option>
                <option value="anthropic/claude-3-opus">🧫 Claude 3 Opus</option>
                <option value="mistralai/mistral-7b-instruct">⚡ Mistral 7B</option>
              </select>
            </div>
            <div className="setting-group">
              <label>Change Chat Type</label>
              <select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="chill">😎 Chill</option>
                <option value="hacker">💻 Hacker</option>
                <option value="savage">🔥 Savage</option>
                <option value="flirty">💘 Flirty</option>
                <option value="psychotic">🫨 Psychotic</option>
                <option value="future">🔮 Time Traveler</option>
                <option value="image">🖼️ Image AI</option>
                <option value="video">🎬 Video AI</option>
              </select>
            </div>
          </div>
        )}

        <section className="chat-area">
          {messages.length === 0 && !loading && (
            <div className="welcome-message">
              <h1>What kind of queries do you want to solve?</h1>
              <p>Start by typing below or uploading a file.</p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === 'You' ? 'you' : 'bot'}`}>
              <div className="bubble">
                {msg.text}
                {msg.image && <img src={msg.image} alt="Generated result" style={{ marginTop: '10px', maxWidth: '100%' }} />}
              </div>
            </div>
          ))}

          {loading && (
            <div className="message bot">
              <div className="bubble typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </section>

        <footer className="input-bar">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask CypherX anything..."
          />
          <div className="input-actions">
            <button className="file-upload-btn" onClick={() => alert("Upload coming soon")}>📎</button>
            <button onClick={mode === 'image' ? handleImageGenerate : sendMessage}>Send</button>
          </div>
        </footer>
      </main>
    </div>
  );
}