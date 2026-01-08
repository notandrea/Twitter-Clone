'use client';
import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', pass: '' });
  const router = useRouter();

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', formData);
      if (res.data && res.data.access_token) {
        localStorage.setItem('token', res.data.access_token);
        if (res.data.user) {
          localStorage.setItem('user', JSON.stringify(res.data.user));
        }
        router.push('/');
        router.refresh();
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black p-4">
      <div className="w-full max-w-md space-y-8 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl">
        <div className="flex flex-col items-center space-y-2">
          <div className="text-3xl font-black italic">𝕏</div>
          <h2 className="text-2xl font-bold tracking-tight">
            Log in to Twitter
          </h2>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-500 p-3 rounded-lg text-sm font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setFormData({ ...formData, pass: e.target.value })
            }
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-full font-bold hover:bg-blue-600 transition"
          >
            Log in
          </button>
        </form>

        <p className="text-center text-zinc-500">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
