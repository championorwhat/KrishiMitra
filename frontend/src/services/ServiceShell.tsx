"use client";
import React, { useEffect, useState } from 'react';
import { Mic, Paperclip, Settings } from 'lucide-react';

type Props = {
  keyName: string; // key for localStorage
  title: string;
};

export default function ServiceShell({ keyName, title }: Props) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(keyName);
      if (raw) setMessages(JSON.parse(raw));
    } catch (e) {
      console.error('Failed to parse messages', e);
    }
  }, [keyName]);

  useEffect(() => {
    try {
      localStorage.setItem(keyName, JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save messages', e);
    }
  }, [messages, keyName]);

  function send() {
    if (!input.trim()) return;
    setMessages((m) => [...m, input.trim()]);
    setInput('');
  }

  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{title}</h1>

      <div className="bg-green-100 text-green-900 rounded-xl p-4 mb-6 max-w-full w-full text-center shadow-sm">
        <p>Your harvest matters — ask questions for {title}.</p>
      </div>

      <div className="mb-4">
        <div className="space-y-2 max-h-64 overflow-auto p-2 border border-gray-200 rounded">
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
            placeholder={`Ask about ${title}...`}
            className="w-full bg-white border border-gray-200 rounded-full py-4 pl-14 pr-28 text-lg outline-none focus:ring-2 focus:ring-green-400 transition-shadow"
          />
          <div className="absolute right-4 flex items-center gap-3">
            <Paperclip className="w-6 h-6 text-gray-500 hover:text-green-600 cursor-pointer transition-colors" />
            <Settings className="w-6 h-6 text-gray-500 hover:text-green-600 cursor-pointer transition-colors" />
          </div>
        </div>
        <div className="mt-3 text-right">
          <button onClick={send} className="bg-green-600 text-white px-4 py-2 rounded-full">Send</button>
        </div>
      </div>
    </div>
  );
}
