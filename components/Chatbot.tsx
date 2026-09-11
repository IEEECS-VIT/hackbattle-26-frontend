"use client";

import { useState, useRef, useEffect } from "react";
import { sendChatMessage } from "@/lib/chatbot";

type Message = {
  sender: "user" | "bot";
  text: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Wild BOT appeared! How can I help you with HackBattle?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
          text: "Connection failed! The wild BOT protected itself...",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono select-none">
      {/* Trigger Button - Poké Ball Theme */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-[#dc2626] from-50% to-[#f8fafc] to-50% border-4 border-[#0f172a] shadow-[0_4px_0_#0f172a] transition-all hover:scale-105 active:translate-y-1 active:shadow-none"
          aria-label="Open Chatbot"
        >
          {/* Poké Ball Center Line & Button */}
          <div className="absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 bg-[#0f172a]" />
          <div className="absolute top-1/2 left-1/2 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#0f172a] bg-white">
            <div className="h-1.5 w-1.5 rounded-full bg-[#0f172a]" />
          </div>
        </button>
      )}

      {/* Chat Window - Game UI Style */}
      {isOpen && (
        <div className="flex h-[480px] w-[320px] sm:w-[380px] flex-col rounded-xl border-4 border-[#0f172a] bg-[#1e293b] text-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
          {/* Header - Pokédex / Badge Bar Style */}
          <div className="flex items-center justify-between border-b-4 border-[#0f172a] bg-[#dc2626] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <div className="h-3.5 w-3.5 rounded-full border border-black bg-[#38bdf8] animate-pulse" />
              <span className="font-bold text-sm tracking-widest text-[#fef08a] uppercase drop-shadow-[1px_1px_0_#000]">
                POKéCHAT
              </span>
            
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#fef08a] hover:text-white font-black text-xl leading-none transition-colors"
            >
              X
            </button>
          </div>

          {/* Sub-Header Bar */}
          <div className="border-b-2 border-[#0f172a] bg-[#991b1b] px-4 py-1 text-[10px] text-red-200 tracking-wider uppercase">
            Battle Assistant v1.0
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0f172a]/50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-lg border-2 px-3 py-2 text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "border-[#854d0e] bg-[#fef08a] text-[#422006]"
                      : "border-[#475569] bg-[#334155] text-slate-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"
                  }`}
                >
                  <div className="text-[9px] opacity-75 font-bold mb-0.5 uppercase">
                    {msg.sender === "user" ? "TRAINER" : "WILD BOT"}
                  </div>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="border-2 border-[#475569] bg-[#334155] rounded-lg px-3 py-2 text-xs text-amber-300 italic animate-pulse">
                  BOT is preparing an attack...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area - Command Box */}
          <div className="border-t-4 border-[#0f172a] p-3 bg-[#1e293b] flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Select move..."
              className="flex-1 rounded-md bg-[#0f172a] px-3 py-2 text-xs text-white placeholder-slate-400 border-2 border-[#475569] focus:outline-none focus:border-[#fef08a]"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="rounded-md bg-[#dc2626] hover:bg-[#b91c1c] active:translate-y-0.5 px-4 py-2 font-black text-xs text-white border-2 border-[#0f172a] shadow-[2px_2px_0px_0px_#0f172a] disabled:opacity-50 uppercase tracking-wider transition-all"
            >
              FIGHT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
