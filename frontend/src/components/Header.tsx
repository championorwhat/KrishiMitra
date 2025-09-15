"use client";
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/navbar';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <>
      <Navbar />
 
      
      {/* User Info or Login/Signup Buttons */}
      {currentUser ? (
        <div className="flex items-center gap-4">
          <span className="text-white font-medium">
            Welcome, {currentUser.email?.split('@')[0]}
          </span>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-colors text-sm"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link href="/login" className="px-6 py-2 bg-green-100 text-green-600 rounded-full font-medium hover:bg-green-200 transition-colors">
            Login
          </Link>
          <Link href="/signup" className="px-6 py-2 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors">
            Sign Up
          </Link>
        </div>
      )}
    </>
  );
};

export default Header;
