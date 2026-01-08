'use client';
import { useEffect, useState } from 'react';
import api from '../lib/api';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TweetCard from '@/components/TweetCard';
import NewTweetForm from '@/components/NewTweetForm';

export default function Home() {
  const [tweets, setTweets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [myId, setMyId] = useState<number | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const userRaw = localStorage.getItem('user');
    if (userRaw && userRaw !== 'undefined') {
      const user = JSON.parse(userRaw);
      setMyId(user.id);
   } else {
     router.push('/login');
   }
   fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      const res = await api.get('/tweets');
      setTweets(res.data);
    } catch (err) {
      console.error('Error while fetching tweets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTweetPosted = (tweet: any) => {
    setTweets([tweet, ...tweets]);
  };

  const deleteTweet = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this tweet?')) return;
    try {
      await api.delete(`/tweets/${id}`);
      setTweets(tweets.filter((t: any) => t.id !== id));
    } catch (err) {
      alert('Could not delete.');
    }
  };

  const handleLike = async (tweetId: number) => {
    if (!myId) return;
    try {
      await api.post(`/tweets/${tweetId}/like`, { userId: myId });
      fetchTweets(); 
    } catch (err) {
      console.error('Error liking this:', err);
    }
  };

  const handleRetweet = async (tweetId: number) => {
    if (!myId) return;
    try {
      await api.post(`/tweets/${tweetId}/retweet`, { userId: myId }); 
      fetchTweets();
    } catch (err) {
      console.error('Error retweeting this:', err);
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">


      <div className="max-w-xl mx-auto border-x border-zinc-200 dark:border-zinc-800 min-h-screen">
        <header className="sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 p-4 z-20">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-extrabold tracking-tight">Home</h2>
            <div className="flex items-center gap-4">
              <Link
                href={myId ? `/profile/${myId}` : '/login'}
                className="text-sm font-bold hover:underline"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = '/login';
                }}
                className="text-sm font-bold text-red-500 hover:underline"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <NewTweetForm onTweetPosted={handleTweetPosted} myId={myId} />

        {loading ? (
          <p className="p-10 text-center text-zinc-500 animate-pulse">
            Loading feed...
          </p>
        ) : (
          <div className="flex flex-col">
            {tweets.map((tweet: any) => (
              <TweetCard
                key={tweet.id}
                tweet={tweet}
                currentUserId={myId}
                onLike={handleLike}
                onRetweet={handleRetweet}
                onDelete={deleteTweet}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
