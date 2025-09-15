"use client";
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [isSignUpActive, setIsSignUpActive] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(email, password);
      router.push('/');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[linear-gradient(to_right,_#e2e2e2,_#c9ffdd)]">
      <div className="relative w-[768px] max-w-full min-h-[480px] bg-white rounded-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] overflow-hidden">
        {/* Sign Up */}
        <div className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-[600ms] ease-in-out ${isSignUpActive ? 'translate-x-full opacity-100 z-[5] animate-[move_0.6s] pointer-events-auto' : 'opacity-0 z-[1] pointer-events-none'} will-change-transform`}>
          <form onSubmit={handleSubmit} className="h-full flex flex-col items-center justify-center px-10">
            <h1 className="text-2xl font-semibold">Create Account</h1>
            <div className="my-5 flex gap-2">
              <span className="w-10 h-10 rounded-xl border border-zinc-300 inline-flex items-center justify-center text-sm">G+</span>
              <span className="w-10 h-10 rounded-xl border border-zinc-300 inline-flex items-center justify-center text-sm">f</span>
              <span className="w-10 h-10 rounded-xl border border-zinc-300 inline-flex items-center justify-center text-sm">GH</span>
              <span className="w-10 h-10 rounded-xl border border-zinc-300 inline-flex items-center justify-center text-sm">in</span>
            </div>
            <span className="text-xs">or use your email for registration</span>
            <input 
              className="w-full bg-zinc-100 rounded-lg px-4 py-2 text-sm mt-2 outline-none" 
              type="text" 
              placeholder="Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input 
              className="w-full bg-zinc-100 rounded-lg px-4 py-2 text-sm mt-2 outline-none" 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              className="w-full bg-zinc-100 rounded-lg px-4 py-2 text-sm mt-2 outline-none" 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="submit" 
              disabled={loading}
              className="mt-3 bg-[#2da846] text-white text-xs px-10 py-2 rounded-lg font-semibold tracking-wide uppercase disabled:opacity-50"
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        </div>

        {/* Sign In */}
        <div className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-[600ms] ease-in-out ${isSignUpActive ? 'translate-x-full opacity-0 z-[1] pointer-events-none' : 'opacity-100 z-[2] pointer-events-auto'} will-change-transform`}>
          <form onSubmit={handleSubmit} className="h-full flex flex-col items-center justify-center px-10">
            <h1 className="text-2xl font-semibold">Sign In</h1>
            <div className="my-5 flex gap-2">
              <span className="w-10 h-10 rounded-xl border border-zinc-300 inline-flex items-center justify-center text-sm">G+</span>
              <span className="w-10 h-10 rounded-xl border border-zinc-300 inline-flex items-center justify-center text-sm">f</span>
              <span className="w-10 h-10 rounded-xl border border-zinc-300 inline-flex items-center justify-center text-sm">GH</span>
              <span className="w-10 h-10 rounded-xl border border-zinc-300 inline-flex items-center justify-center text-sm">in</span>
            </div>
            <span className="text-xs">or use your email password</span>
            <input 
              className="w-full bg-zinc-100 rounded-lg px-4 py-2 text-sm mt-2 outline-none" 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              className="w-full bg-zinc-100 rounded-lg px-4 py-2 text-sm mt-2 outline-none" 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a className="text-xs mt-2" href="#">Forget Your Password?</a>
            <button 
              type="submit" 
              disabled={loading}
              className="mt-3 bg-[#2da846] text-white text-xs px-10 py-2 rounded-lg font-semibold tracking-wide uppercase disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Toggle Container */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-[600ms] ease-in-out rounded-[150px_0_0_100px] z-[1000] ${isSignUpActive ? '-translate-x-full rounded-[0_150px_100px_0]' : ''} will-change-transform`}>
          <div
            className={`text-white relative left-[-100%] h-full w-[200%] transition-transform duration-[600ms] ease-in-out ${isSignUpActive ? 'translate-x-1/2' : ''} will-change-transform`}
            style={{ background: 'linear-gradient(to right, #5cc05e, #2da83b)' }}
          >
            <div className="absolute top-0 left-0 w-1/2 h-full flex items-center justify-center flex-col text-center px-8">
              <h1 className="text-3xl font-semibold">Welcome Back!</h1>
              <p className="mt-2 text-sm">Enter your personal details to use all of site features</p>
              <button className="mt-4 text-white border border-white rounded-lg text-xs px-10 py-2 uppercase" onClick={() => setIsSignUpActive(false)}>Sign In</button>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full flex items-center justify-center flex-col text-center px-8">
              <h1 className="text-3xl font-semibold">Hello, Friend!</h1>
              <p className="mt-2 text-sm">Register with your personal details to use all of site features</p>
              <button className="mt-4 text-white border border-white rounded-lg text-xs px-10 py-2 uppercase" onClick={() => setIsSignUpActive(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <style jsx global>{`
        @keyframes move {
          0%, 49.99% { opacity: 0; z-index: 1; }
          50%, 100% { opacity: 1; z-index: 5; }
        }
      `}</style>
    </div>
  );
}
