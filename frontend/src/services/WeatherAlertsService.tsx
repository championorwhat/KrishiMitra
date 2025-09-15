"use client";
import React, { useEffect, useState } from "react";
import { Mic, User, Bot } from "lucide-react";

// message type
type Message = {
  role: "user" | "bot";
  text: string;
  timestamp?: string;
};

const loadMessages = (key: string): Message[] => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Message[]) : [];
  } catch {
    return [];
  }
};

const saveMessages = (key: string, messages: Message[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(messages));
  } catch {
    // ignore
  }
};

export default function WeatherAlertsService() {
  const [messages, setMessages] = useState<Message[]>(() =>
    typeof window !== "undefined" ? loadMessages("weather_alerts_history") : []
  );
  const [input, setInput] = useState("");

  useEffect(() => {
    saveMessages("weather_alerts_history", messages);
  }, [messages]);

  // send handler
  const send = () => {
    if (!input.trim()) return;
    const newMessage: Message = { role: "user", text: input.trim() };
    setMessages((prev) => [...prev, newMessage]);

    // Bot response (fixed apostrophe issue with backticks)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Got it! I will keep you updated with weather alerts.", timestamp: new Date().toISOString() },
      ]);
    }, 600);

    setInput("");
  };

  const exampleTip =
    "Weather alerts help you plan ahead — check forecasts regularly.";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2">
        Weather Alerts &amp; Predictions
      </h1>
      <p className="text-sm text-gray-600 mb-4">{exampleTip}</p>

      {/* Forecast cards */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-white rounded-2xl shadow-lg border border-green-100">
          <h3 className="font-semibold text-green-700">Today's Forecast</h3>
          <p className="text-gray-600 mt-2">
            Sunny with scattered showers in the evening. Temp 24-30°C.
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl shadow-lg border border-green-100">
          <h3 className="font-semibold text-green-700">Alerts</h3>
          <p className="text-gray-600 mt-2">
            No severe alerts in your area currently.
          </p>
        </div>
      </div>

      {/* Chat window */}
      <div className="mb-6">
        <div className="space-y-3 max-h-72 overflow-auto p-4 border border-gray-200 rounded-xl bg-gray-50 shadow-inner">
          {messages.length === 0 ? (
            <div className="text-sm text-gray-500 text-center py-6">
              No conversation yet.
            </div>
          ) : (
            messages.map((m, i) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={i}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-end gap-2 ${
                      isUser ? "flex-row-reverse" : ""
                    }`}
                  >
                    <span className="rounded-full bg-green-200 p-1">
                      {isUser ? (
                        <User className="w-5 h-5 text-green-700" />
                      ) : (
                        <Bot className="w-5 h-5 text-gray-500" />
                      )}
                    </span>
                    <span
                      className={`text-sm p-3 rounded-2xl shadow-md max-w-xs ${
                        isUser
                          ? "bg-green-100 text-green-900"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      {m.text}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Input box */}
      <div className="w-full sticky bottom-0 z-10">
        <div className="relative flex items-center bg-white rounded-full shadow-lg px-4 py-3 border border-gray-200">
          <div className="absolute left-4" title="Voice input">
            <Mic className="w-6 h-6 text-gray-400" />
          </div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Ask about weather and alerts..."
            className="w-full rounded-full bg-transparent py-3 pl-12 pr-28 text-lg outline-none focus:ring-2 focus:ring-green-400 transition"
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
          />
          <div className="absolute right-4 flex items-center gap-2">
            <button
              onClick={send}
              className="bg-green-600 hover:bg-green-700 transition text-white font-semibold px-6 py-2 rounded-full shadow"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
