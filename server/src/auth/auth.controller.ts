import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignInResponseDto } from './dto/sign-in.response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @ApiOperation({ summary: 'Sign in' })
  signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    const { username, password } = signInDto;
    console.log('signInDto', signInDto);
    return this.authService.signIn(username, password);
  }
}
