import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'; 

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async followUser(followerId: number, followingId: number) {
    if (followerId === followingId) {
      throw new Error('You cannot follow yourself !');
    }

    return this.prisma.follows.create({
      data: {
        followerId,
        followingId,
      },
    });
  }

  async unfollowUser(followerId: number, followingId: number) {
    return this.prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
  }
}
