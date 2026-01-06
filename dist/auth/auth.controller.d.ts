import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: any): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        createdAt: Date;
    }>;
    login(body: {
        email: string;
        pass: string;
    }): Promise<{
        access_token: string;
    }>;
}
