import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const { JWT_SECRET_REFRESH_KEY, TOKEN_REFRESH_EXPIRE_TIME } = process.env;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private user: UserService,
    private jwtService: JwtService,
  ) {}

  async singup(dto: AuthDto) {
    const { login, password } = dto;
    const hash = await argon.hash(password);
    try {
      const user = await this.user.addUser({ login, password: hash });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException();
      }
      throw error;
    }
  }

  async login({ login, password }: AuthDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        login,
      },
    });
    if (!user) throw new ForbiddenException('login is incorrect');
    const pwMatches = argon.verify(user.password, password);
    if (!pwMatches) throw new ForbiddenException('password is incorrect');
    delete user.password;
    const payload = { id: user.id, username: user.login };
    const accessToken = await this.getToken(payload);
    const refreshToken = await this.getRefreshToken(payload);
    return { accessToken, refreshToken };
  }
  async refresh({ refreshToken }) {
    if (!refreshToken) throw new UnauthorizedException();
    try {
      const { id } = await this.jwtService.verifyAsync(refreshToken);
      const { login, password } = await this.user.findOne(id);
      const payload = { login, password };
      const accessToken = await this.getToken(payload);
      const refreshTokenUp = await this.getRefreshToken(payload);
      return { accessToken, refreshToken: refreshTokenUp };
    } catch {
      throw new ForbiddenException('refresh token is invalid');
    }
  }
  async getToken(payload) {
    return await this.jwtService.signAsync(payload);
  }
  async getRefreshToken(payload) {
    return await this.jwtService.signAsync(payload, {
      secret: JWT_SECRET_REFRESH_KEY,
      expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
    });
  }
}
