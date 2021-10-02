import { Module } from '@nestjs/common';
import { UserController } from '../presentation/controller/user.controller';
import { UsersRepository } from '../infrastructure/database/repositories/UsersRepository';
import { IUsersRepository } from '../application/ports/UsersRepository.interface';
import { UserUseCases } from '../application/use_cases/UserUseCases';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserUseCases,
    { provide: IUsersRepository, useClass: UsersRepository },
  ],
})
export class UserModule {}
