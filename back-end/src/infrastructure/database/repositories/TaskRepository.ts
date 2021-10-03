import { InjectConnection } from '@nestjs/typeorm';
import { Connection, EntityManager, QueryRunner } from 'typeorm';
import { CreateTaskDto } from '../../../application/dto/create-task.dto';
import { ITasksRepository } from '../../../application/ports/TaskRepository.interface';
import { Task } from '../../../domain/models/task/task';
import { TaskSchema } from '../mapper/TaskSchema';

export class TaskRepository implements ITasksRepository {
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