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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetsController = void 0;
const common_1 = require("@nestjs/common");
const tweets_service_1 = require("./tweets.service");
const auth_guard_1 = require("../auth/auth.guard");
const common_2 = require("@nestjs/common");
let TweetsController = class TweetsController {
    tweetService;
    constructor(tweetService) {
        this.tweetService = tweetService;
    }
    async create(req, body) {
        const userId = req.user.sub;
        return this.tweetService.createTweet(userId, body.content);
    }
    async findAll(skip, take) {
        return this.tweetService.getAllTweets(skip ? parseInt(skip) : 0, take ? parseInt(take) : 10);
    }
    async like(tweetId, req) {
        const userId = req.user.sub;
        return this.tweetService.likeTweet(userId, Number(tweetId));
    }
    async retweet(tweetId, req, content) {
        const userId = req.user.sub;
        return this.tweetService.retweet(userId, Number(tweetId), content);
    }
    async getUserProfile(userId) {
        return this.tweetService.getUserTweets(Number(userId));
    }
};
exports.TweetsController = TweetsController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TweetsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_2.Query)('skip')),
    __param(1, (0, common_2.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TweetsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(':id/like'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TweetsController.prototype, "like", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(':id/retweet'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], TweetsController.prototype, "retweet", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TweetsController.prototype, "getUserProfile", null);
exports.TweetsController = TweetsController = __decorate([
    (0, common_1.Controller)('tweets'),
    __metadata("design:paramtypes", [tweets_service_1.TweetsService])
], TweetsController);
//# sourceMappingURL=tweets.controller.js.map