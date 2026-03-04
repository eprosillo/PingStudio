import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration (re-using the config from index.tsx)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(null);
      alert('Signed up successfully!');
      // TODO: Redirect or show main app content
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
      alert('Logged in successfully!');
      // TODO: Redirect or show main app content
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-white text-brand-black p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-display text-brand-black mb-6 text-center">PingStudio Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-brand-gray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-brand-gray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
        <button
          onClick={handleSignIn}
          className="w-full bg-brand-black text-brand-white font-semibold p-3 rounded-md hover:bg-gray-800 transition-colors mb-2"
        >
          Log In
        </button>
        <button
          onClick={handleSignUp}
          className="w-full bg-brand-blue text-brand-white font-semibold p-3 rounded-md hover:bg-coastal-blue transition-colors"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Auth;
