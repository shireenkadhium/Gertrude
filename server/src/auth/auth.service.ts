import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: await this.generateAccessToken(payload),
    };
  }

  private async generateAccessToken(payload) {
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('jwt.access.secret'),
        expiresIn: this.configService.get('jwt.access.expiresIn'),
      }),
    };
  }
}
