"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from '@/contexts/AuthContext'; // Import the auth context
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { currentUser, logout } = useAuth(); // Get user and logout function
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            // Optional: redirect user after logout
            router.push('/'); 
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    return (
        <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent p-4">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">KrishiMitra</span>
                </Link>

                {/* Login/Logout Buttons & Mobile Menu Toggle */}
                <div className="flex items-center md:order-2 space-x-3 rtl:space-x-reverse">
                    {/* User Info or Login/Signup Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {currentUser ? (
                            <>
                                <span className="text-white font-medium">
                                    Welcome, {currentUser.email?.split('@')[0]}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-colors text-sm"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex gap-2">
                                <Link href="/login" className="px-5 py-2 text-white rounded-full font-medium hover:bg-white/10 transition-colors">
                                    Login
                                </Link>
                                <Link href="/signup" className="px-5 py-2 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setOpen((s) => !s)}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>

                {/* Navigation Links */}
                <div className={`items-center justify-between ${open ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-800 bg-opacity-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                        <li><Link href="/" className="block py-2 px-3 text-white rounded md:hover:bg-transparent md:hover:text-green-400 md:p-0">Home</Link></li>
                        <li><Link href="/about" className="block py-2 px-3 text-white rounded md:hover:bg-transparent md:hover:text-green-400 md:p-0">About</Link></li>
                        <li><Link href="/services" className="block py-2 px-3 text-white rounded md:hover:bg-transparent md:hover:text-green-400 md:p-0">Services</Link></li>
                        <li><Link href="/pricing" className="block py-2 px-3 text-white rounded md:hover:bg-transparent md:hover:text-green-400 md:p-0">Pricing</Link></li>
                        <li><Link href="/contact" className="block py-2 px-3 text-white rounded md:hover:bg-transparent md:hover:text-green-400 md:p-0">Contact</Link></li>
                         {/* Mobile-only Auth Buttons */}
                         <li className="md:hidden mt-4 pt-4 border-t border-gray-700">
                            {currentUser ? (
                                <div className="flex items-center justify-between">
                                    <span className="text-white font-medium">Welcome, {currentUser.email?.split('@')[0]}</span>
                                    <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-full font-medium text-sm">Logout</button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                     <Link href="/login" className="px-5 py-2 text-white text-center rounded-full font-medium hover:bg-white/10">Login</Link>
                                     <Link href="/signup" className="px-5 py-2 bg-green-500 text-white text-center rounded-full font-medium hover:bg-green-600">Sign Up</Link>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}