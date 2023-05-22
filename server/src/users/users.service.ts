import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponseDto } from './dto/create-user.response.dto';

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

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
