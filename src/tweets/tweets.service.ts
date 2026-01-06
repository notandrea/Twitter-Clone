import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TweetsService {
  constructor(private prisma: PrismaService) {}

  async createTweet(userId: number, content: string) {
    return this.prisma.tweet.create({
      data: {
        content: content,
        userId: userId,
      },
    });
  }

  async getAllTweets(skip: number = 0, take: number = 10) {
    return this.prisma.tweet.findMany({
      skip: skip,
      take: take,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        likes: true,
        originalTweet: {
          include: {
            author: {
              select: { username: true },
            },
          },
        },
        _count: {
          select: {
            likes: true,
            retweets: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async likeTweet(userId: number, tweetId: number) {
    return this.prisma.like.create({
      data: {
        userId: userId,
        tweetId: tweetId,
      },
    });
  }
  async retweet(userId: number, originalTweetId: number, content?: string) {
    return this.prisma.tweet.create({
      data: {
        content: content || '',
        userId: userId,
        originalTweetId: originalTweetId,
      },
      include: { originalTweet: true },
    });
  }

  async getUserTweets(userId: number) {
    return this.prisma.tweet.findMany({
      where: {
        userId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
      
            _count: {
              select: {
                followers: true,
                following: true,
              },
            },
          },
        },
        likes: true,
        originalTweet: {
          include: {
            author: {
              select: { username: true },
            },
          },
        },
        _count: {
          select: {
            likes: true,
            retweets: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
