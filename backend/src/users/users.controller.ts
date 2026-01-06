import { Controller, Post, Param, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post('follow/:id')
  async follow(@Param('id') followingId: string, @Request() req) {
    const followerId = req.user.sub;
    return this.usersService.followUser(followerId, Number(followingId));
  }

  @UseGuards(AuthGuard)
  @Post('unfollow/:id')
  async unfollow(@Param('id') followingId: string, @Request() req) {
    const followerId = req.user.sub;
    return this.usersService.unfollowUser(followerId, Number(followingId));
  }
}
