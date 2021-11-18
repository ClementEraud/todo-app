import { CreateTaskDto } from '../../command/create-task.dto';
import { Task } from '../../../domain/models/Task';

export abstract class ITaskWriteRepository {
	abstract insert(task: CreateTaskDto): Promise<Task>;
}
