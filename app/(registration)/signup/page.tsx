'use client';
import { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function SignUp() {
  const [loadingForm, setLoadingForm] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingForm(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoadingForm(false);
  };

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    await signIn('google');
    setLoadingGoogle(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-lg shadow-green-300 rounded-lg space-y-4">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center text-2xl font-semibold mb-6">Register</h1>

          <label htmlFor="username" className="block">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Enter your username"
          />

          <label htmlFor="email" className="block">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Enter your email"
          />

          <label htmlFor="password" className="block">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full p-2 mb-6 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Enter your password"
          />

          <button
            type="submit"
            disabled={loadingForm}
            className="w-full bg-black text-green-300 p-3 rounded-md text-lg font-bold hover:bg-gray-800 transition duration-200 flex justify-center items-center"
          >
            {loadingForm ? (
              <div className="w-5 h-5 border-2 border-green-300 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Register'
            )}
          </button>
        </form>

        <p className="text-center">or</p>

        <button
          onClick={handleGoogleLogin}
          disabled={loadingGoogle}
          className="w-full bg-black text-blue-500 p-3 rounded-md text-lg font-bold hover:bg-gray-800 transition duration-200 flex justify-center items-center gap-2"
        >
          {loadingGoogle ? (
            <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <GoogleIcon style={{ color: 'blue', fontSize: 30 }} />
            </>
          )}
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?&nbsp;
          <Link href="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
