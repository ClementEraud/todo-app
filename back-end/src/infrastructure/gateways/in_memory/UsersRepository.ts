import { IUsersRepository } from 'src/use_cases/ports/UsersRepository.interface';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../../domain/user';

const users = [
  {
    id: uuidv4(),
    firstName: 'Uncle',
    lastName: 'Bob',
  },
  {
    id: uuidv4(),
    firstName: 'Etienne',
    lastName: 'Klein',
  },
];

export class UsersRepository implements IUsersRepository {
  async save(user: User): Promise<User> {
    users.push(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return users;
  }
}
