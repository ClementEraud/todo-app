import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '../infrastructure/database/repositories/UsersRepository';
import { IUsersRepository } from './ports/UsersRepository.interface';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: IUsersRepository, useClass: UsersRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
