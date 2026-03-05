import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-black p-4 text-brand-white font-sans">
      <div className="w-full max-w-md rounded-sm border border-white/10 bg-brand-black p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-display uppercase tracking-widest text-brand-rose">PingStudio</h1>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-gray">Production Logbook</p>
        </div>

        {error && (
          <div className="mb-6 rounded-sm border border-red-500/20 bg-red-500/10 p-3 text-center text-[10px] font-bold uppercase tracking-widest text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="mb-2 block text-[9px] font-bold uppercase tracking-widest text-brand-gray">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-xs text-white outline-none transition-all focus:border-brand-rose focus:ring-1 focus:ring-brand-rose placeholder:text-white/20"
              placeholder="ENTER EMAIL"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-[9px] font-bold uppercase tracking-widest text-brand-gray">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-xs text-white outline-none transition-all focus:border-brand-rose focus:ring-1 focus:ring-brand-rose placeholder:text-white/20"
              placeholder="ENTER PASSWORD"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 flex w-full items-center justify-center rounded-sm bg-brand-rose py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg transition-all hover:bg-[#c99595] active:scale-95"
          >
            {isLogin ? 'Log In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[9px] font-bold uppercase tracking-widest text-brand-gray hover:text-brand-rose underline underline-offset-4 decoration-brand-gray/30 hover:decoration-brand-rose"
          >
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Log In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
