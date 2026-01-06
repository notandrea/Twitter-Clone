import { PrismaService } from 'src/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    followUser(followerId: number, followingId: number): Promise<{
        followerId: number;
        followingId: number;
    }>;
    unfollowUser(followerId: number, followingId: number): Promise<{
        followerId: number;
        followingId: number;
    }>;
}
