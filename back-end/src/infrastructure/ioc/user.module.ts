import { AddTaskToUser } from '../../application/use_cases/AddTaskToUser';
import { CreateUser } from '../../application/use_cases/CreateUser';
import { DeleteUser } from '../../application/use_cases/DeleteUser';
import { EncryptionService } from '../services/EncryptionService';
import { GetAllUsers } from '../../application/use_cases/GetAllUsers';
import { GetUser } from '../../application/use_cases/GetUser';
import { IEncryptionService } from '../../application/ports/services/EncryptionService';
import { ITaskWriteRepository } from '../../application/ports/task/TaskWriteRepository.interface';
import { IUserReadRepository } from '../../application/ports/user/UserReadRepository.interface';
import { IUserWriteRepository } from '../../application/ports/user/UserWriteRepository.interface';
import { LoginUser } from '../../application/use_cases/LoginUser';
import { Module } from '@nestjs/common';
import { TaskWriteRepository } from '../database/repositories/task/TaskWriteRepository';
import { UpdateUser } from '../../application/use_cases/UpdateUser';
import { UserController } from '../../presentation/controller/user.controller';
import { UserReadRepository } from '../database/repositories/user/UserReadRepository';
import { UserWriteRepository } from '../database/repositories/user/UserWriteRepository';

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
		LoginUser,
		{ provide: IUserReadRepository, useClass: UserReadRepository },
		{ provide: IUserWriteRepository, useClass: UserWriteRepository },
		{ provide: ITaskWriteRepository, useClass: TaskWriteRepository },
		{ provide: IEncryptionService, useClass: EncryptionService },
	],
})
export class UserModule {}
