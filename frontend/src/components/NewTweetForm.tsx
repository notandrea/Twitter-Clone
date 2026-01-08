'use client';
import { useState } from 'react';
import api from '../lib/api';

interface NewTweetFormProps {
  onTweetPosted: (tweet: any) => void;
  myId: number | null;
}

export default function NewTweetForm({ onTweetPosted, myId }: NewTweetFormProps) {
  const [newTweet, setNewTweet] = useState('');

  const postTweet = async () => {
    if (!newTweet.trim()) return;
    try {
      const res = await api.post('/tweets/create', {
        content: newTweet,
      });
      onTweetPosted(res.data);
      setNewTweet('');
    } catch (err) {
      console.error('Error posting tweet:', err);
    }
  };

  return (
    <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
          {myId ? 'ME' : 'U'}
        </div>
        <div className="flex-1">
          <textarea
            className="w-full bg-transparent text-xl outline-none resize-none placeholder-zinc-500 mt-2"
            placeholder="What is happening?!"
            rows={3}
            value={newTweet}
            onChange={(e) => setNewTweet(e.target.value)}
          />
          <div className="flex justify-end items-center gap-4 mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-900">
            <span
              className={`text-xs ${
                newTweet.length > 280
                  ? 'text-red-500 font-bold'
                  : 'text-zinc-500'
              }`}
            >
              {newTweet.length} / 280
            </span>

            <button
              onClick={(e) => {
                e.preventDefault();
                postTweet();
              }}
              disabled={!newTweet.trim() || newTweet.length > 280 || !myId}
              className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold disabled:opacity-50 hover:bg-blue-600 transition"
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
