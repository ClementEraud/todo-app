import { Injectable } from '@nestjs/common';
import { User } from '../../domain/models/user/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUsersRepository } from '../ports/UsersRepository.interface';

@Injectable()
export class UserUseCases {
  constructor(private readonly userRepository: IUsersRepository) {}

  async create(createUser: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(userId: number): Promise<User> {
    return this.userRepository.findOne(userId);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<boolean> {
    return this.userRepository.remove(id);
  }
}
