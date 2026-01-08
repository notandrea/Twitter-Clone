'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import TweetCard from '@/components/TweetCard';

export default function UserProfile() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [tweets, setTweets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [myId, setMyId] = useState<number | null>(null);

  const fetchProfile = async () => {
    if (!params.id || params.id === 'null' || params.id === 'undefined') {
      console.error('Invalid ID in URL');
      return;
    }

    try {
      setLoading(true);
      const [resProfile, resTweets] = await Promise.all([
        api.get(`/users/${params.id}`),
        api.get(`/tweets/user/${params.id}`),
      ]);
      setUser(resProfile.data);
      setTweets(resTweets.data);
    } catch (err) {
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userRaw = localStorage.getItem('user');
    if (userRaw && userRaw !== 'undefined') {
      const u = JSON.parse(userRaw);
      setMyId(u.id);
    }
    fetchProfile();
  }, [id]);

  const handleFollowToggle = async () => {
    if (!user) return;

    const isCurrentlyFollowing = user.isFollowedByMe;

    try {
      setUser({
        ...user,
        isFollowedByMe: !isCurrentlyFollowing,
        _count: {
          ...user._count,
          followers: isCurrentlyFollowing
            ? user._count.followers - 1
            : user._count.followers + 1,
        },
      });
      if (isCurrentlyFollowing) {
        await api.post(`/users/unfollow/${id}`);
      } else {
        await api.post(`/users/follow/${id}`);
      }
    } catch (err) {
      console.error('Follow error:', err);
      fetchProfile();
    }
  };

  const handleLike = async (tweetId: number) => {
    if (!myId) return;
    try {
      await api.post(`/tweets/${tweetId}/like`, { userId: myId });
      // Refresh logic could be better (e.g. local update), but refetching is simple
      const res = await api.get(`/tweets/user/${id}`);
      setTweets(res.data);
    } catch (err) {
      console.error('Error liking this:', err);
    }
  };

  const handleRetweet = async (tweetId: number) => {
    if (!myId) return;
    try {
      await api.post(`/tweets/${tweetId}/retweet`, { userId: myId });
      const res = await api.get(`/tweets/user/${id}`);
      setTweets(res.data);
    } catch (err) {
      console.error('Error retweeting this:', err);
    }
  };

  const deleteTweet = async (tweetId: number) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.delete(`/tweets/${tweetId}`);
      setTweets(tweets.filter((t: any) => t.id !== tweetId));
    } catch (err) {
      alert('Could not delete.');
    }
  };

  if (loading)
    return <div className="p-10 text-center">Loading profile...</div>;
  if (!user) return <div className="p-10 text-center">User not found.</div>;

  const isMe = myId === Number(id);

  return (
    <main className="max-w-xl mx-auto border-x border-zinc-200 dark:border-zinc-800 min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
        <button
          onClick={() => router.back()}
          className="mb-4 text-blue-500 hover:underline"
        >
          ← Back
        </button>

        <div className="flex justify-between items-start">
          <div>
            <div className="w-20 h-20 rounded-full bg-zinc-200 mb-2 overflow-hidden">
              <img
                src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user.username}`}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-zinc-500">@{user.username?.toLowerCase()}</p>
          </div>

          {!isMe && (
            <button
              onClick={handleFollowToggle}
              className={`px-6 py-2 rounded-full font-bold transition ${
                user.isFollowedByMe
                  ? 'border border-zinc-300 dark:border-zinc-700 hover:bg-red-50 dark:hover:bg-red-950 text-red-500'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {user.isFollowedByMe ? 'Unfollow' : 'Follow'}
            </button>
          )}

          {isMe && (
            <button className="px-6 py-2 border border-zinc-300 rounded-full font-bold opacity-50 cursor-not-allowed">
              It's You
            </button>
          )}
        </div>

        <div className="flex gap-6 mt-4">
          <span>
            <strong>{user._count?.following || 0}</strong>{' '}
            <span className="text-zinc-500">Following</span>
          </span>
          <span>
            <strong>{user._count?.followers || 0}</strong>{' '}
            <span className="text-zinc-500">Followers</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        {tweets.length === 0 ? (
          <div className="p-10 text-center text-zinc-500">
            No tweets yet.
          </div>
        ) : (
          tweets.map((tweet) => (
            <TweetCard
              key={tweet.id}
              tweet={tweet}
              currentUserId={myId}
              onLike={handleLike}
              onRetweet={handleRetweet}
              onDelete={deleteTweet}
            />
          ))
        )}
      </div>
    </main>
  );
}
