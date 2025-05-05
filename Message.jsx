import React from "react";

export default function Message({
  sender,
  text,
  input,
  setInput,
  setMessages,
  setLoading,
  username,
  systemPrompts,
  model,
  askCypherX,
  mode
}) {
  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "You", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const systemPrompt = `${username ? `The user's name is ${username}.` : ""} ${systemPrompts[mode] || systemPrompts.savage}`;
    const replyText = await askCypherX(input, model, systemPrompt);
    const botMessage = { sender: "CypherX", text: replyText };
    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);

    speakText(replyText); // 🔈 Make CypherX speak its reply
  };

  return (
    <div className={`message ${sender === "You" ? "user" : "bot"}`}>
      <div className="avatar">
        <span role="img" aria-label={sender === "You" ? "user" : "ai"}>
          {sender === "You" ? "🧑" : "🧠"}
        </span>
      </div>
      <div className="bubble">{text}</div>
    </div>
  );
}
