import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { SignInResponseDto } from './dto/sign-in.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signIn(username: string, password: string): Promise<SignInResponseDto> {
    const user = await this.usersService.findByEmail(username);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException();
    }

    const jwtPayload = { username: user.email, id: user.id, roles: user.roles };
    const tokens = await this.generateTokens(jwtPayload);

    user.accessToken = tokens.accessToken;
    user.refreshToken = tokens.refreshToken;

    await this.usersService.update(user.id, user);

    return plainToInstance(SignInResponseDto, { ...user, ...tokens });
  }
  private async generateTokens(payload) {
    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }
  private async generateAccessToken(payload) {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwt.access.secret'),
      expiresIn: this.configService.get('jwt.access.expiresIn'),
    });
  }
  private async generateRefreshToken(payload) {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwt.refresh.secret'),
      expiresIn: this.configService.get('jwt.refresh.expiresIn'),
    });
  }
}
