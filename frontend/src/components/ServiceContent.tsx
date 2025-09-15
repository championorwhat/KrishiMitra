"use client";
import React from 'react';
import { Mic, Settings, Paperclip } from 'lucide-react';

type Props = { title: string };

export default function ServiceContent({ title }: Props) {
  return (
    <div className="flex flex-col items-center justify-start min-h-[60vh] px-4 py-6">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{title}</h1>

      <div className="bg-green-100 text-green-900 rounded-xl p-4 mb-8 max-w-md w-full text-center shadow-sm">
        <p>Your harvest matters — share your questions with KrishiMitra.</p>
      </div>

      <div className="w-full max-w-2xl">
        <div className="relative flex items-center">
          <div className="absolute left-4">
            <Mic className="w-6 h-6 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Ask anything..."
            className="w-full bg-white border border-gray-200 rounded-full py-4 pl-14 pr-28 text-lg outline-none focus:ring-2 focus:ring-green-400 transition-shadow"
          />
          <div className="absolute right-4 flex items-center gap-3">
            <Paperclip className="w-6 h-6 text-gray-500 hover:text-green-600 cursor-pointer transition-colors" />
            <Settings className="w-6 h-6 text-gray-500 hover:text-green-600 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}
