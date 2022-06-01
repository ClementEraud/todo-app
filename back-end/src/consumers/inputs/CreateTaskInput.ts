import { ApiProperty } from '@nestjs/swagger';
import { CreateTaskCommand } from '../../application/command/create-task';

export class CreateTaskInput implements CreateTaskCommand {
	@ApiProperty({
		description: 'Title of task',
		required: true,
	})
	title: string;

	@ApiProperty({
		description: 'Description of task',
		required: true,
	})
	description: string;
}
