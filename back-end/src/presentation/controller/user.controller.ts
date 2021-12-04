import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	Response,
} from '@nestjs/common';
import { AddTaskToUser } from '../../application/use_cases/AddTaskToUser';
import { CreateTaskVM } from '../view-models/CreateTaskVM';
import { CreateUser } from '../../application/use_cases/CreateUser';
import { CreateUserVM } from '../view-models/CreateUserVM';
import { DeleteUser } from '../../application/use_cases/DeleteUser';
import { GetAllUsers } from '../../application/use_cases/GetAllUsers';
import { GetUser } from '../../application/use_cases/GetUser';
import { LoginUser } from '../../application/use_cases/LoginUser';
import { UpdateUser } from '../../application/use_cases/UpdateUser';
import { UpdateUserVM } from '../view-models/UpdateUserVM';
import { UserLoginVM } from '../view-models/UserLoginVM';
import { UserVM } from '../view-models/UserVM';

@ApiTags('users')
@Controller('users')
export class UserController {
	constructor(
		private readonly createUser: CreateUser,
		private readonly getAllUsers: GetAllUsers,
		private readonly getUser: GetUser,
		private readonly updateUser: UpdateUser,
		private readonly deleteUser: DeleteUser,
		private readonly addTaskUser: AddTaskToUser,
		private readonly loginUser: LoginUser,
	) {}

	@Post()
	@ApiCreatedResponse({
		description: 'The User has been successfully created.',
		type: UserVM,
	})
	async create(@Body() createUser: CreateUserVM): Promise<UserVM> {
		return UserVM.toViewModel(await this.createUser.execute(createUser));
	}

	@Get()
	@ApiCreatedResponse({
		description: 'All users in database.',
		type: [UserVM],
	})
	async findAll(): Promise<UserVM[]> {
		const users = await this.getAllUsers.execute();
		return users.map(UserVM.toViewModel);
	}

	@Get(':id')
	@ApiCreatedResponse({
		description: 'The User has been found.',
		type: UserVM,
	})
	async findOne(@Param('id') id: string): Promise<UserVM> {
		return UserVM.toViewModel(await this.getUser.execute(id));
	}

	@Patch(':id')
	@ApiCreatedResponse({
		description: 'The user has been successfully updated.',
		type: UserVM,
	})
	async update(
		@Param('id') id: string,
		@Body() updateUser: UpdateUserVM,
	): Promise<UserVM> {
		return UserVM.toViewModel(await this.updateUser.execute(id, updateUser));
	}

	@Delete(':id')
	@ApiCreatedResponse({
		description: 'The user has been successfully deleted.',
	})
	remove(@Param('id') id: string) {
		return this.deleteUser.execute(id);
	}

	@Post(':id/add-task')
	@ApiCreatedResponse({
		type: UserVM,
	})
	async addTask(
		@Param('id') userId: string,
		@Body() createTask: CreateTaskVM,
	): Promise<UserVM> {
		return UserVM.toViewModel(
			await this.addTaskUser.execute(userId, createTask),
		);
	}

	@Post('login')
	@ApiCreatedResponse({
		type: UserVM,
	})
	@HttpCode(200)
	async login(@Body() userLogin: UserLoginVM): Promise<UserVM> {
		return UserVM.toViewModel(
			await this.loginUser.execute(userLogin.username, userLogin.password),
		);
	}
}
