"use client";
import React from 'react';

type Props = {
  items: string[];
  selected: string;
  onSelect: (s: string) => void;
};

export default function Sidebar({ items, selected, onSelect }: Props) {
  return (
    <aside className="w-80 bg-white rounded-lg shadow-sm p-3">
      <ul className="flex flex-col divide-y">
        {items.map((item) => (
          <li key={item} className={`${selected === item ? 'bg-green-50' : ''}`}>
            <button
              onClick={() => onSelect(item)}
              className="w-full text-left px-4 py-3 text-sm font-semibold"
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
