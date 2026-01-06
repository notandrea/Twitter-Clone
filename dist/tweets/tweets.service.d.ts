import { PrismaService } from '../prisma.service';
export declare class TweetsService {
    private prisma;
    constructor(prisma: PrismaService);
    createTweet(userId: number, content: string): Promise<{
        content: string | null;
        createdAt: Date;
        id: number;
        userId: number;
        originalTweetId: number | null;
    }>;
    getAllTweets(skip?: number, take?: number): Promise<({
        author: {
            id: number;
            username: string;
            email: string;
        };
        likes: {
            id: number;
            userId: number;
            tweetId: number;
        }[];
        originalTweet: ({
            author: {
                username: string;
            };
        } & {
            content: string | null;
            createdAt: Date;
            id: number;
            userId: number;
            originalTweetId: number | null;
        }) | null;
        _count: {
            likes: number;
            retweets: number;
        };
    } & {
        content: string | null;
        createdAt: Date;
        id: number;
        userId: number;
        originalTweetId: number | null;
    })[]>;
    likeTweet(userId: number, tweetId: number): Promise<{
        id: number;
        userId: number;
        tweetId: number;
    }>;
    retweet(userId: number, originalTweetId: number, content?: string): Promise<{
        originalTweet: {
            content: string | null;
            createdAt: Date;
            id: number;
            userId: number;
            originalTweetId: number | null;
        } | null;
    } & {
        content: string | null;
        createdAt: Date;
        id: number;
        userId: number;
        originalTweetId: number | null;
    }>;
    getUserTweets(userId: number): Promise<({
        author: {
            id: number;
            _count: {
                followers: number;
                following: number;
            };
            username: string;
            email: string;
        };
        likes: {
            id: number;
            userId: number;
            tweetId: number;
        }[];
        originalTweet: ({
            author: {
                username: string;
            };
        } & {
            content: string | null;
            createdAt: Date;
            id: number;
            userId: number;
            originalTweetId: number | null;
        }) | null;
        _count: {
            likes: number;
            retweets: number;
        };
    } & {
        content: string | null;
        createdAt: Date;
        id: number;
        userId: number;
        originalTweetId: number | null;
    })[]>;
}
