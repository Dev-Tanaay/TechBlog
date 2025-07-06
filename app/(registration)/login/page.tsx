'use client';
import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loading from '@/app/loading/page';
import GoogleIcon from '@mui/icons-material/Google';
import { loginUser } from '@/lib/schemas/auth';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const parse = loginUser.safeParse({ email, password });
    if (!parse.success) {
      const formatted = parse.error.format();
      let field = '';
      let msg = '';
      if (formatted.email?._errors?.length) {
        field = 'Email';
        msg = formatted.email._errors[0];
      } else if (formatted.password?._errors?.length) {
        field = 'Password';
        msg = formatted.password._errors[0];
      } else {
        msg = 'Invalid input';
      }
      setError(`${field}: ${msg}`);
      setLoading(false);
      return;
    }
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      setError('Invalid credentials');
    } else {
      router.push('/blogs');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    await signIn('google');
    setGoogleLoading(false);
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
        <h1 className="text-center text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Enter your email"
          />
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            type="password"
            id="password"
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
            disabled={loading}
            className="w-full bg-black text-green-300 p-3 rounded-md text-lg font-bold hover:bg-gray-800 transition duration-200 flex justify-center items-center"
          >
            {loading ? <Loading /> : 'Login'}
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
              <GoogleIcon style={{ color: 'blue', fontSize: 30}} />
              Google login
            </>
          )}
        </button>
        <p className="text-center text-sm mt-4">
          Don&rsquo;t have an account?&nbsp;
          <Link href="/signup" className="text-green-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
