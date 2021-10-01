import { Injectable } from '@nestjs/common';
import { User } from '../domain/user/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUsersRepository } from './ports/UsersRepository.interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: IUsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(userId: string): Promise<User> {
    return this.userRepository.findOne(userId);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<boolean> {
    return this.userRepository.remove(id);
  }
}
