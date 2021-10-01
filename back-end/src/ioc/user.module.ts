import { Module } from '@nestjs/common';
import { UserController } from '../infrastructure/presentation/controller/user.controller';
import { UsersRepository } from '../infrastructure/database/repositories/UsersRepository';
import { IUsersRepository } from '../use_cases/ports/UsersRepository.interface';
import { UserService } from '../use_cases/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../infrastructure/database/mapper/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: IUsersRepository, useClass: UsersRepository },
  ],
})
export class UserModule {}
