'use client';
import Loading from '@/app/loading/page';
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 2000));
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    await signIn('google');
    setGoogleLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-lg shadow-green-300 rounded-lg space-y-4">
        <h1 className="text-center text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Enter your email"
          />

          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            className="w-full p-2 mb-6 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Enter your password"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-green-300 p-3 rounded-md text-lg font-bold hover:bg-gray-800 transition duration-200 flex justify-center items-center"
          >
            {loading ? (
              <Loading />
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="text-center">or</p>

        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full bg-black text-blue-500 p-3 rounded-md text-lg font-bold hover:bg-gray-800 transition duration-200 flex justify-center items-center gap-2"
        >
          {googleLoading ? (
            <Loading />
          ) : (
            <>
              <GoogleIcon style={{ color: 'blue', fontSize: 24 }} />
              Google
            </>
          )}
        </button>

        <p className="text-center text-sm mt-4">
          Don&rsquo;t have an account?
          <Link href="/signup" className="text-green-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
