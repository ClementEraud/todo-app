import { Injectable } from '@nestjs/common';
import { User } from '../domain/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUsersRepository } from './ports/UsersRepository.interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: IUsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(
      new User(createUserDto.firstName, createUserDto.lastName),
    );
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user with ${updateUserDto}`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
