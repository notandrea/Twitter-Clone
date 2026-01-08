'use client';
import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const router = useRouter();

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/register', formData);
      router.push('/login');
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black p-4">
      <div className="w-full max-w-md space-y-8 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm">
        <div className="flex flex-col items-center space-y-2">
          {/* Logo Placeholder */}
          <div className="text-3xl font-black italic">𝕏</div>
          <h2 className="text-2xl font-bold text-center tracking-tight text-zinc-900 dark:text-zinc-100">
            Create your account
          </h2>
        </div>

        {error && (
            <div className="bg-red-500/10 text-red-500 p-3 rounded-lg text-sm font-bold text-center">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-full font-bold hover:bg-blue-600 transition-colors mt-2"
          >
            Sign up
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-zinc-500">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-blue-500 hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
