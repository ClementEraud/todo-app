import { User } from '../../domain/user';

export abstract class IUsersRepository {
  abstract save(user: User): Promise<User>;
  abstract findAll(): Promise<User[]>;
}
