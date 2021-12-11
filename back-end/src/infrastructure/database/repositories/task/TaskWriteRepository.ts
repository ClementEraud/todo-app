import { Connection, EntityManager, QueryRunner } from 'typeorm';
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

	async insert(taskToCreate: Task): Promise<Task> {
		await this.manager.insert(TaskSchema, taskToCreate);
		return taskToCreate;
	}
}
