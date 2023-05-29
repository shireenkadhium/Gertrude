import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponseDto } from './dto/create-user.response.dto';
import { GetUserResponseDto } from './dto/get-user.response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): CreateUserResponseDto {
    const user = this.usersRepository.save(createUserDto);
    return plainToInstance(CreateUserResponseDto, user);
  }

  update(id: number, user: User) {
    return this.usersRepository.update(id, user);
  }

  async findAll(): Promise<GetUserResponseDto[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => plainToInstance(GetUserResponseDto, user));
  }

  async patchUser(id: number, patchUserDto: any) {
    const user = await this.findById(id);
    Object.assign(user, patchUserDto);
    await this.update(id, user);

    return plainToInstance(GetUserResponseDto, user);
  }

  findById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
