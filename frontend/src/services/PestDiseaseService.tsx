"use client";
import React, { useEffect, useState } from 'react';
import { Mic } from 'lucide-react';

export default function PestDiseaseService() {
  const KEY = 'pest_disease_history';
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
    setTimeout(() => setMessages((m) => [...m, `Bot: Identified possible pest: Aphids (example).`]), 600);
    setInput('');
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Pest & Disease Detection</h2>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow-sm">
          <h3 className="font-medium">Common Signs</h3>
          <p className="text-sm text-gray-600 mt-2">Look for leaf curling, sticky residue, and yellowing.</p>
        </div>

        <div className="p-4 bg-white rounded shadow-sm">
          <h3 className="font-medium">Immediate Actions</h3>
          <p className="text-sm text-gray-600 mt-2">Isolate affected plants and consider neem oil application.</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="space-y-2 max-h-64 overflow-auto p-2 border border-gray-200 rounded bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-sm text-gray-500">No conversation yet.</div>
          ) : (
            messages.map((m, i) => (
              <div key={i} className="text-sm p-2 bg-white rounded shadow-sm">{m}</div>
            ))
          )}
        </div>
      </div>

      <div className="w-full max-w-2xl">
        <div className="relative flex items-center">
          <div className="absolute left-4">
            <Mic className="w-6 h-6 text-gray-400" />
          </div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder={`Describe the symptoms or upload a photo...`}
            className="w-full bg-white border border-gray-200 rounded-full py-4 pl-14 pr-28 text-lg outline-none focus:ring-2 focus:ring-green-400 transition-shadow"
          />
          <div className="absolute right-4 flex items-center gap-3">
            <button onClick={send} className="bg-green-600 text-white px-4 py-2 rounded-full">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
