"use client";
import React, { useEffect, useState } from 'react';
import { Mic, User, Bot } from 'lucide-react';

export default function SoilFertilizerService() {
  const KEY = 'soil_fertilizer_history';
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) setMessages(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(messages));
  }, [messages]);

  function send() {
    if (!input.trim()) return;
    setMessages((m) => [...m, `You: ${input.trim()}`]);
    setTimeout(() => setMessages((m) => [...m, `Bot: Recommendation saved for soil sample.`]), 600);
    setInput('');
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-tl from-green-50 via-white to-emerald-100 pt-8">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-4 text-green-800">Soil & Fertilizer Insights</h2>
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-white rounded-2xl shadow-lg border border-green-100">
            <h3 className="font-semibold text-green-700">Quick NPK Recommendation</h3>
            <p className="text-gray-600 mt-2">Based on common crops, try balanced NPK and test soil pH.</p>
            <ul className="mt-3 text-sm space-y-1 ml-1">
              <li>- Nitrogen: <span className="font-medium text-yellow-600">Medium</span></li>
              <li>- Phosphorus: <span className="font-medium text-blue-600">Low</span></li>
              <li>- Potassium: <span className="font-medium text-green-700">Medium</span></li>
            </ul>
          </div>
          <div className="p-5 bg-white rounded-2xl shadow-lg border border-green-100">
            <h3 className="font-semibold text-green-700">Soil Test Tips</h3>
            <p className="text-gray-600 mt-2">Collect samples from 5–10 spots, 15cm depth. Use dry samples for lab tests.</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="space-y-3 max-h-72 overflow-auto p-4 border border-gray-200 rounded-xl bg-gray-50 shadow-inner">
            {messages.length === 0 ? (
              <div className="text-sm text-gray-500 text-center py-6">No conversation yet.</div>
            ) : (
              messages.map((m, i) => {
                const user = m.startsWith('You:');
                return (
                  <div key={i} className={`flex ${user ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-end gap-2 ${user ? 'flex-row-reverse' : ''}`}>
                      <span className="rounded-full bg-green-200 p-1">
                        {user ? <User className="w-5 h-5 text-green-700" /> : <Bot className="w-5 h-5 text-gray-500" />}
                      </span>
                      <span className={`text-sm p-3 rounded-2xl shadow-md max-w-xs ${user ? 'bg-green-100 text-green-900' : 'bg-white text-gray-700'}`}>
                        {m.replace(/^(You:|Bot:)\s?/, '')}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="w-full sticky bottom-0 z-10">
          <div className="relative flex items-center bg-white rounded-full shadow-lg px-4 py-3 border border-gray-200">
            <div className="absolute left-4" title="Coming soon">
              <Mic className="w-6 h-6 text-gray-400" />
            </div>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              type="text"
              placeholder="Ask about soil and fertilizers..."
              className="w-full rounded-full bg-transparent py-3 pl-12 pr-28 text-lg outline-none focus:ring-2 focus:ring-green-400 transition"
              onKeyDown={e => { if (e.key === 'Enter') send(); }}
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
    </div>
  );
}
