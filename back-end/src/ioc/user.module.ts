import { Module } from '@nestjs/common';
import { UserController } from '../infrastructure/presentation/controller/user.controller';
import { UsersRepository } from '../infrastructure/database/repositories/UsersRepository';
import { IUsersRepository } from '../use_cases/ports/UsersRepository.interface';
import { UserService } from '../use_cases/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: IUsersRepository, useClass: UsersRepository },
  ],
})
export class UserModule {}
