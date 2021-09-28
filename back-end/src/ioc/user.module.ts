import { Module } from '@nestjs/common';
import { UserController } from '../infrastructure/controller/user.controller';
import { UsersRepository } from '../infrastructure/gateways/in_memory/UsersRepository';
import { IUsersRepository } from '../use_cases/ports/UsersRepository.interface';
import { UserService } from '../use_cases/user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    { provide: IUsersRepository, useClass: UsersRepository },
  ],
})
export class UserModule {}
