import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponseDto } from './dto/create-user.response.dto';
import { Public } from '../@core/decorators/public-route.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  getAllUsers(): Promise<CreateUserDto[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Create user' })
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    return this.usersService.create(createUserDto);
  }
}
