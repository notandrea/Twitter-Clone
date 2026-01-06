'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function Home() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    // Го повикуваме ендпоинтот што го направивме во NestJS
    api.get('/tweets').then((res) => setTweets(res.data));
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <div className="max-w-xl mx-auto border-x border-zinc-800 min-h-screen">
        <h1 className="text-xl font-bold p-4 border-b border-zinc-800">Home</h1>
        
        {tweets.map((tweet: any) => (
          <div key={tweet.id} className="p-4 border-b border-zinc-800 hover:bg-zinc-900/50 transition">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full" />
              <div>
                <p className="font-bold">{tweet.author?.name || 'User'}</p>
                <p className="text-zinc-400 mt-1">{tweet.content}</p>
              </div>
            </div>
          </div>
        ))}
        
        {tweets.length === 0 && (
          <p className="p-10 text-center text-zinc-500">Нема твитови сеуште. Биди прв што ќе напише!</p>
        )}
      </div>
    </main>
  );
}