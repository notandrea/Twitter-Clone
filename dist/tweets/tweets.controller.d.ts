import { TweetsService } from './tweets.service';
export declare class TweetsController {
    private tweetService;
    constructor(tweetService: TweetsService);
    create(req: any, body: {
        content: string;
    }): Promise<{
        content: string | null;
        createdAt: Date;
        id: number;
        userId: number;
        originalTweetId: number | null;
    }>;
    findAll(skip?: string, take?: string): Promise<({
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
    like(tweetId: string, req: any): Promise<{
        id: number;
        userId: number;
        tweetId: number;
    }>;
    retweet(tweetId: string, req: any, content?: string): Promise<{
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
    getUserProfile(userId: string): Promise<({
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
