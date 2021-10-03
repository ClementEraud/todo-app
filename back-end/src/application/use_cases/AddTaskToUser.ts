import { Injectable } from '@nestjs/common';
import { User } from '../../domain/models/user/user';
import { CreateTaskDto } from '../dto/create-task.dto';
import { ITasksRepository } from '../ports/TaskRepository.interface';
import { IUserRepository } from '../ports/UsersRepository.interface';
import { UseCase } from './UseCase.interface';

@Injectable()
export class AddTaskToUser implements UseCase {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly taskRepository: ITasksRepository,
	) {}

	async execute(userId: number, taskToAdd: CreateTaskDto): Promise<User> {
		const user = await this.userRepository.findOne(userId);
		const task = await this.taskRepository.insert(taskToAdd);
		user.addTask(task);
		return await this.userRepository.save(user);
	}
}
