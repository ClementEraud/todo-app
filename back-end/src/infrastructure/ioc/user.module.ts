import { AddTaskToUser } from '../../application/use_cases/AddTaskToUser';
import { CreateUser } from '../../application/use_cases/CreateUser';
import { DeleteUser } from '../../application/use_cases/DeleteUser';
import { GetAllUsers } from '../../application/use_cases/GetAllUsers';
import { GetUser } from '../../application/use_cases/GetUser';
import { ITasksRepository } from '../../application/ports/TaskRepository.interface';
import { IUserRepository } from '../../application/ports/UsersRepository.interface';
import { Module } from '@nestjs/common';
import { TaskRepository } from '../database/repositories/TaskRepository';
import { UpdateUser } from '../../application/use_cases/UpdateUser';
import { UserController } from '../../presentation/controller/user.controller';
import { UserRepository } from '../database/repositories/UserRepository';

@Module({
	imports: [],
	controllers: [UserController],
	providers: [
		CreateUser,
		DeleteUser,
		GetAllUsers,
		GetUser,
		UpdateUser,
		AddTaskToUser,
		{ provide: IUserRepository, useClass: UserRepository },
		{ provide: ITasksRepository, useClass: TaskRepository },
	],
})
export class UserModule {}
