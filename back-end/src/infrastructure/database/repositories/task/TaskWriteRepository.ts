import { Connection, EntityManager, QueryRunner } from 'typeorm';
import { CreateTaskDto } from '../../../../application/command/create-task.dto';
import { ITaskWriteRepository } from '../../../../application/ports/task/TaskWriteRepository.interface';
import { InjectConnection } from '@nestjs/typeorm';
import { Task } from '../../../../domain/models/Task';
import { TaskSchema } from '../../mapper/TaskSchema';

export class TaskWriteRepository implements ITaskWriteRepository {
	readonly manager: EntityManager;
	readonly queryRunner?: QueryRunner;

	constructor(@InjectConnection() connection: Connection) {
		this.queryRunner = connection.createQueryRunner();
		this.manager = this.queryRunner.manager;
	}

	async insert(taskToCreate: CreateTaskDto): Promise<Task> {
		return this.manager.create(TaskSchema, taskToCreate);
	}
}
