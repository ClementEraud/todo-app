import { User } from '../../domain/user/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export abstract class IUsersRepository {
  abstract save(user: CreateUserDto): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findOne(userId: string): Promise<User>;
  abstract update(userId: string, updateUser: UpdateUserDto): Promise<User>;
  abstract remove(userId: string): Promise<boolean>;
}
