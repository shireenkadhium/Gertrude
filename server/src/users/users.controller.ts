import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponseDto } from './dto/create-user.response.dto';
import { GetUserResponseDto } from './dto/get-user.response.dto';
import { PatchUserDto } from './dto/patch-user.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  async getAllUsers(): Promise<GetUserResponseDto[]> {
    const users = await this.usersService.findAll();
    console.log(users);
    return users;
  }

  @ApiOperation({ summary: 'Create user' })
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.delete(Number(id));
  }

  @ApiOperation({ summary: 'Patch user' })
  @Patch(':id')
  async patchUser(@Param('id') id: string, @Body() patchUserDto: PatchUserDto) {
    return this.usersService.patchUser(Number(id), patchUserDto);
  }
}
