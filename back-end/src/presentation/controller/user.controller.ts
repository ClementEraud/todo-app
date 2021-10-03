import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AddTaskToUser } from '../../application/use_cases/AddTaskToUser';
import { CreateUser } from '../../application/use_cases/CreateUser';
import { DeleteUser } from '../../application/use_cases/DeleteUser';
import { GetAllUsers } from '../../application/use_cases/GetAllUsers';
import { GetUser } from '../../application/use_cases/GetUser';
import { UpdateUser } from '../../application/use_cases/UpdateUser';
import { CreateTaskVM } from '../view-models/CreateTaskVM';
import { CreateUserVM } from '../view-models/CreateUserVM';
import { UpdateUserVM } from '../view-models/UpdateUserVM';
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
  async findOne(@Param('id') id: number): Promise<UserVM> {
  	return UserVM.toViewModel(await this.getUser.execute(id));
  }

  @Patch(':id')
  @ApiCreatedResponse({
  	description: 'The user has been successfully updated.',
  	type: UserVM,
  })
  async update(@Param('id') id: number, @Body() updateUser: UpdateUserVM): Promise<UserVM> {
  	return UserVM.toViewModel(await this.updateUser.execute(id, updateUser));
  }

  @Delete(':id')
  @ApiCreatedResponse({
  	description: 'The user has been successfully deleted.',
  })
  remove(@Param('id') id: number) {
  	return this.deleteUser.execute(id);
  }

  @Post(':id/add-task')
  @ApiCreatedResponse({
  	type: UserVM,
  })
  async addTask(@Param('id') userId: number, @Body() createTask: CreateTaskVM): Promise<UserVM> {
  	return UserVM.toViewModel(await this.addTaskUser.execute(userId, createTask));
  }
}
