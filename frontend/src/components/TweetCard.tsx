import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface TweetCardProps {
  tweet: any;
  currentUserId: number | null;
  onLike: (id: number) => void;
  onRetweet: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TweetCard({
  tweet,
  currentUserId,
  onLike,
  onRetweet,
  onDelete,
}: TweetCardProps) {
  return (
    <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <img
              src={`https://api.dicebear.com/7.x/identicon/svg?seed=${
                tweet.author?.username || 'user'
              }`}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <Link
              href={`/profile/${tweet.author?.id}`}
              className="font-bold text-[15px] hover:underline truncate"
              onClick={(e) => e.stopPropagation()}
            >
              {tweet.author?.username || 'User'}
            </Link>
            <span className="text-zinc-500 text-[14px]">·</span>
            <span className="text-zinc-500 text-[14px]">
              {tweet.createdAt
                ? formatDistanceToNow(new Date(tweet.createdAt))
                : ''}
            </span>
          </div>

          <p className="mt-1 text-[15px] leading-normal text-zinc-900 dark:text-zinc-100 break-words">
            {tweet.content}
          </p>

          <div className="flex justify-start gap-12 mt-3 text-zinc-500">
            <button
              className="flex items-center gap-2 hover:text-green-500 group transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onRetweet(tweet.id);
              }}
            >
              <div className="p-2 group-hover:bg-green-500/10 rounded-full transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
                </svg>
              </div>
              <span className="text-xs font-medium">
                {tweet._count?.retweets || 0}
              </span>
            </button>

            <button
              className="flex items-center gap-2 hover:text-pink-500 group transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onLike(tweet.id);
              }}
            >
              <div className="p-2 group-hover:bg-pink-500/10 rounded-full transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M16.697 5.5c-1.222 0-2.35.533-3.135 1.45L12 8.694 10.438 6.95c-.784-.917-1.913-1.45-3.135-1.45C5.12 5.5 3.25 7.41 3.25 9.75c0 4.28 4.67 8.05 8.75 11.25 4.08-3.2 8.75-6.97 8.75-11.25 0-2.34-1.87-4.25-4.303-4.25z"></path>
                </svg>
              </div>
              <span className="text-xs font-medium">
                {tweet._count?.likes || 0}
              </span>
            </button>

            {currentUserId === tweet.authorId && (
              <button
                className="flex items-center gap-2 hover:text-red-500 group transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(tweet.id);
                }}
              >
                <div className="p-2 group-hover:bg-red-500/10 rounded-full transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M16 6V4.5C16 3.12 14.88 2 13.5 2h-3C9.12 2 8 3.12 8 4.5V6H3v2h1.06l.81 12.12c.05.81.72 1.44 1.53 1.44h11.2c.81 0 1.48-.63 1.53-1.44l.81-12.12H21V6h-5zM10 4.5c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5V6h-4V4.5zm7.07 15.5H6.93l-.74-11h11.62l-.74 11z"></path>
                  </svg>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
