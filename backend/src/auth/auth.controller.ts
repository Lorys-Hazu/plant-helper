import { Controller, UnauthorizedException } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private db: DatabaseService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: Prisma.UserCreateInput) {
    const hashedPassword = await this.authService.hashPassword(
      createUserDto.password,
    );

    const user = await this.db.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });

    return { ...user, password: undefined };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
