import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    follow(followingId: string, req: any): Promise<{
        followerId: number;
        followingId: number;
    }>;
    unfollow(followingId: string, req: any): Promise<{
        followerId: number;
        followingId: number;
    }>;
}
