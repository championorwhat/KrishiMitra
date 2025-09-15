"use client";
import React, { useEffect, useState } from "react";

const SERVICE_KEYS = [
  { key: "soil_fertilizer_history", label: "Soil & Fertilizer Insights" },
  { key: "weather_alerts_history", label: "Weather Alerts & Predictions" },
  { key: "pest_disease_history", label: "Pest & Disease Detection" },
  { key: "market_price_history", label: "Market Price Updates" },
  { key: "voice_assistance_history", label: "Voice Assistance" },
] as const;

type ServiceKey = (typeof SERVICE_KEYS)[number]["key"];

type ChatMessage = {
  role: "user" | "bot";
  text: string;
};

export default function ChatHistory() {
  const [histories, setHistories] = useState<Record<ServiceKey, ChatMessage[]>>({
    soil_fertilizer_history: [],
    weather_alerts_history: [],
    pest_disease_history: [],
    market_price_history: [],
    voice_assistance_history: [],
  });

  useEffect(() => {
    const loaded: Record<ServiceKey, ChatMessage[]> = {
      soil_fertilizer_history: [],
      weather_alerts_history: [],
      pest_disease_history: [],
      market_price_history: [],
      voice_assistance_history: [],
    };

    SERVICE_KEYS.forEach((s) => {
      try {
        const raw = localStorage.getItem(s.key);
        loaded[s.key] = raw ? (JSON.parse(raw) as ChatMessage[]) : [];
      } catch {
        loaded[s.key] = [];
      }
    });

    setHistories(loaded);
  }, []);

  const clearKey = (key: ServiceKey) => {
    localStorage.removeItem(key);
    setHistories((h) => ({ ...h, [key]: [] }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Chat History</h2>

      {SERVICE_KEYS.map((s) => (
        <div key={s.key} className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">{s.label}</h3>
            <button
              onClick={() => clearKey(s.key)}
              className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded"
            >
              Clear
            </button>
          </div>

          <div className="bg-gray-50 p-3 rounded border">
            {histories[s.key] && histories[s.key].length > 0 ? (
              histories[s.key].map((m, idx) => (
                <div key={idx} className="py-1 text-sm">
                  <strong className="mr-2">
                    {m.role === "user" ? "You:" : "Bot:"}
                  </strong>
                  <span>{m.text}</span>
                </div>
              ))
            ) : (
              <div className="text-xs text-gray-500">No history</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
