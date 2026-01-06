"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let TweetsService = class TweetsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTweet(userId, content) {
        return this.prisma.tweet.create({
            data: {
                content: content,
                userId: userId,
            },
        });
    }
    async getAllTweets(skip = 0, take = 10) {
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
    async likeTweet(userId, tweetId) {
        return this.prisma.like.create({
            data: {
                userId: userId,
                tweetId: tweetId,
            },
        });
    }
    async retweet(userId, originalTweetId, content) {
        return this.prisma.tweet.create({
            data: {
                content: content || '',
                userId: userId,
                originalTweetId: originalTweetId,
            },
            include: { originalTweet: true },
        });
    }
    async getUserTweets(userId) {
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
};
exports.TweetsService = TweetsService;
exports.TweetsService = TweetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TweetsService);
//# sourceMappingURL=tweets.service.js.map