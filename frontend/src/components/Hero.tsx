"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

const Hero: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <section 
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/argiima1.jpg')" }}
    >
  {/* Header removed — Navbar handles top navigation now */}

      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Optional green gradient overlay on top */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-green-800/20"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="font-kiona text-[62.6px] font-normal leading-none tracking-normal text-white mb-8">
          KRISHIMITRA
        </h1>
        {currentUser ? (
          <Link 
            href="/advisory" 
            className="inline-block bg-lime-400 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-lime-500 transition-colors shadow-lg"
          >
            Advisory Page
          </Link>
        ) : (
          <Link 
            href="/login" 
            className="inline-block bg-lime-400 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-lime-500 transition-colors shadow-lg"
          >
            Join Us Now
          </Link>
        )}
      </div>
    </section>
  );
};

export default Hero;
