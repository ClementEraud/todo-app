import { ITaskWriteRepository } from '../../../../application/ports/task/TaskWriteRepository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../../../domain/models/Task';
import { TaskSchema } from '../../mapper/TaskSchema';

export class TaskWriteRepository implements ITaskWriteRepository {
	constructor(
		@InjectRepository(TaskSchema) private taskRepository: Repository<Task>,
	) {}

	async insert(taskToCreate: Task): Promise<Task> {
		await this.taskRepository.insert(taskToCreate);
		return taskToCreate;
	}
}
