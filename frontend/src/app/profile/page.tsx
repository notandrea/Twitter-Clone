'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function MyProfile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
        
        if (!savedUser.id) {
          router.push('/login');
          return;
        }

        const res = await api.get(`/users/${savedUser.id}`);
        setUser(res.data);
      } catch (err) {
        console.error('Error while loading the profile');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchMyProfile();
  }, [router]);
  
  if (loading)
    return <div className="p-10 text-center">Loading your profile...</div>;
  if (!user) return null;

  return (
    <main className="max-w-xl mx-auto border-x border-zinc-200 dark:border-zinc-800 min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl font-bold">My Profile</h2>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center">
          <div className="w-24 h-24 rounded-full bg-zinc-200 overflow-hidden border-2 border-blue-500">
            <img
              src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user.username}`}
              alt="my avatar"
              className="w-full h-full"
            />
          </div>
          <button
            onClick={() => router.push('/settings')}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-full font-bold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
          >
            Edit Profile
          </button>
        </div>

        <div className="mt-4">
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <p className="text-zinc-500">@{user.email?.split('@')[0]}</p>
        </div>

        <div className="flex gap-6 mt-6">
          <div className="flex gap-1">
            <span className="font-bold">{user._count?.following ?? 0}</span>
            <span className="text-zinc-500">Following</span>
          </div>
          <div className="flex gap-1">
            <span className="font-bold">{user._count?.followers ?? 0}</span>
            <span className="text-zinc-500">Followers</span>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-800 p-4 mt-4">
        <h3 className="font-bold mb-4">My Tweets</h3>
        <p className="text-center text-zinc-500 italic py-10">
          You haven't posted any tweets yet.
        </p>
      </div>
    </main>
  );
}
