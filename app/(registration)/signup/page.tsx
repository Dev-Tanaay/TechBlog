'use client';
import { useState, useEffect } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Loading from '@/app/loading/page';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/schemas/auth';

export default function SignUp() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loadingForm, setLoadingForm] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingForm(true);
    setError(null);

    try {
      const parse = registerUser.safeParse({ username, email, password });
      if (!parse.success) {
        const formatted = parse.error.format();
        let fieldWithError = '';
        let message = '';

        if (formatted.username?._errors?.length) {
          fieldWithError = 'Username';
          message = formatted.username._errors[0];
        } else if (formatted.email?._errors?.length) {
          fieldWithError = 'Email';
          message = formatted.email._errors[0];
        } else if (formatted.password?._errors?.length) {
          fieldWithError = 'Password';
          message = formatted.password._errors[0];
        } else {
          message = 'Invalid input';
        }
        setError(`${fieldWithError}: ${message}`);
        setLoadingForm(false);
        return;
      }
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoadingForm(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    await signIn('google');
    setLoadingGoogle(false);
  };
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [error]);

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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Enter your username"
          />
          <label htmlFor="email" className="block">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Enter your email"
          />
          <label htmlFor="password" className="block">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-6 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Enter your password"
          />
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-2 text-sm font-medium transition">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loadingForm}
            className="w-full bg-black text-green-300 p-3 rounded-md text-lg font-bold hover:bg-gray-800 transition duration-200 flex justify-center items-center"
          >
            {loadingForm ? <Loading /> : 'Register'}
          </button>
        </form>
        <p className="text-center">or</p>
        <button
          onClick={handleGoogleLogin}
          disabled={loadingGoogle}
          className="w-full bg-black text-blue-500 p-3 rounded-md text-lg font-bold hover:bg-gray-800 transition duration-200 flex justify-center items-center gap-2"
        >
          {loadingGoogle ? (
            <Loading />
          ) : (
            <>
              <GoogleIcon style={{ color: 'blue', fontSize: 30 }} />
              Sign up with Google
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
