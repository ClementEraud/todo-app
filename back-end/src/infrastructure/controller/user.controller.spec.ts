import { Test, TestingModule } from '@nestjs/testing';
import { IUsersRepository } from '../../use_cases/ports/UsersRepository.interface';
import { UserService } from '../../use_cases/user.service';
import { UsersRepository } from '../gateways/in_memory/UsersRepository';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        { provide: IUsersRepository, useClass: UsersRepository },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
