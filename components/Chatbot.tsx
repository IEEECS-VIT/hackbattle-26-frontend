"use client";

import { useState } from "react";
import { sendChatMessage } from "@/lib/chatbot";

type Message = {
  sender: "user" | "bot";
  text: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hi! How can I help you with HackBattle?" },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setLoading(true);

    try {
      const botResponse = await sendChatMessage(userText);
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I couldn't reach the server. Try again!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ffdb37] border-2 border-[#163e54] text-2xl shadow-[0_4px_0_#163e54] transition-transform active:scale-95"
          aria-label="Open Chatbot"
        >
          
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="flex h-[450px] w-[320px] sm:w-[380px] flex-col rounded-2xl border-2 border-[#163e54] bg-[#075568] text-white shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/20 bg-[#167f91] px-4 py-3">
            <span className="font-pixeboy text-2xl text-[#ffdf50]">
              HACKBATTLE BOT
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-[#ffdf50] font-bold"
            >
              ✕
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                    msg.sender === "user"
                      ? "bg-[#ffdb37] text-[#153e53] font-medium"
                      : "bg-white/10 text-white border border-white/20"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-xl px-3 py-2 text-sm text-white/70 italic">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-white/20 p-3 bg-[#064353] flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 rounded-xl bg-white/10 px-3 py-2 text-sm text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-[#ffdb37]"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="rounded-xl bg-[#ffdb37] px-4 py-2 font-pixeboy text-xl text-[#153e53] border border-[#163e54] disabled:opacity-50"
            >
              SEND
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
