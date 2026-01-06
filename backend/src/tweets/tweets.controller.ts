import { Controller, Post, Get ,Body, Param, UseGuards, Request, } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { AuthGuard } from '../auth/auth.guard';
import { Query } from '@nestjs/common';

@Controller('tweets')
export class TweetsController {
  constructor(private tweetService: TweetsService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Request() req, @Body() body: { content: string }) {
    const userId = req.user.sub;
    return this.tweetService.createTweet(userId, body.content);
  }

  @Get()
  async findAll(@Query('skip') skip?: string, @Query('take') take?: string) {
    return this.tweetService.getAllTweets(
      skip ? parseInt(skip) : 0,
      take ? parseInt(take) : 10,
    );
  }

  @UseGuards(AuthGuard)
  @Post(':id/like')
  async like(@Param('id') tweetId: string, @Request() req) {
    const userId = req.user.sub;
    return this.tweetService.likeTweet(userId, Number(tweetId));
  }

  @UseGuards(AuthGuard)
  @Post(':id/retweet')
  async retweet(
    @Param('id') tweetId: string,
    @Request() req,
    @Body('content') content?: string,
  ) {
    const userId = req.user.sub;
    return this.tweetService.retweet(userId, Number(tweetId), content);
  }

  @Get('user/:userId')
  async getUserProfile(@Param('userId') userId: string) {
    return this.tweetService.getUserTweets(Number(userId));
  }
}
