'use client';
import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function Home() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/tweets')
      .then((res) => {
        setTweets(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Грешка при влечење твитови:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <div className="max-w-xl mx-auto border-x border-zinc-800 min-h-screen">
        <header className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-zinc-800 p-4">
          <h1 className="text-xl font-bold">Home</h1>
        </header>
        
        {loading ? (
          <p className="p-10 text-center text-zinc-500">Се вчитува...</p>
        ) : (
          <>
            {tweets.map((tweet: any) => (
              <div key={tweet.id} className="p-4 border-b border-zinc-800 hover:bg-zinc-900/50 transition cursor-pointer">
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-zinc-700 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold hover:underline">
                        {tweet.author?.name || 'Корисник'}
                      </span>
                      <span className="text-zinc-500 text-sm">@{tweet.author?.email.split('@')[0]}</span>
                    </div>
                    <p className="text-zinc-100 mt-1 break-words">{tweet.content}</p>
                    
                    <div className="flex justify-between mt-4 text-zinc-500 max-w-sm">
                      <button className="hover:text-blue-400">💬 0</button>
                      <button className="hover:text-green-400">🔄 0</button>
                      <button className="hover:text-pink-400">❤️ 0</button>
                      <button className="hover:text-blue-400">📊 0</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {tweets.length === 0 && (
              <div className="p-10 text-center">
                <p className="text-zinc-500 text-lg">Нема твитови сеуште.</p>
                <p className="text-zinc-600 text-sm">Биди првиот што ќе сподели нешто!</p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}