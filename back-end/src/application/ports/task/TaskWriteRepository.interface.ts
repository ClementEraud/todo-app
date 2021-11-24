import { Task } from '../../../domain/models/Task';

export abstract class ITaskWriteRepository {
	abstract insert(task: Task): Promise<Task>;
}
