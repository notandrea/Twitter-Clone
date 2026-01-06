import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(data: any): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        createdAt: Date;
    }>;
    login(email: string, pass: string): Promise<{
        access_token: string;
    }>;
}
