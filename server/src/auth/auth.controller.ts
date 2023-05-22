import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignInResponseDto } from './dto/sign-in.response.dto';
import { Public } from '../@core/decorators/public-route.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @Public()
  @ApiOperation({ summary: 'Sign in' })
  signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    const { username, password } = signInDto;
    return this.authService.signIn(username, password);
  }
}
