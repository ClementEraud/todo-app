import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../../domain/models/Task';

export class TaskVM {
	@ApiProperty({
		description: 'ID of task.',
		example: 1,
	})
	id: string;

	@ApiProperty({
		description: 'Title of task.',
		example: 'Title',
	})
	title: string;

	@ApiProperty({
		description: 'Description of task.',
		example: 'Description',
	})
	description: string;

	constructor(task: Task) {
		this.id = task.id;
		this.title = task.title;
		this.description = task.description;
	}
}
