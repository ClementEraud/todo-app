import { User } from '../../domain/models/user/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export abstract class IUsersRepository {
  abstract save(user: CreateUserDto): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findOne(userId: number): Promise<User>;
  abstract update(userId: number, updateUserDto: UpdateUserDto): Promise<User>;
  abstract remove(userId: number): Promise<boolean>;
}
