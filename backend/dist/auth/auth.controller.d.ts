import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
export declare class AuthController {
    private authService;
    private db;
    private jwtService;
    constructor(authService: AuthService, db: DatabaseService, jwtService: JwtService);
    register(createUserDto: Prisma.UserCreateInput): Promise<{
        password: any;
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
}
