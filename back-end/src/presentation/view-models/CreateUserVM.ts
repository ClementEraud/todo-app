import { ApiProperty } from '@nestjs/swagger';
import { CreateUserCommand } from '../../application/command/create-user';

export class CreateUserVM implements CreateUserCommand {
	lastName: string;
	@ApiProperty({
		description: 'User first name',
		required: true,
	})
	firstName: string;

	@ApiProperty({
		description: 'User last name',
		required: true,
	})
	@ApiProperty({
		description: 'Username',
		required: true,
	})
	username: string;

	@ApiProperty({
		description: 'User password',
		required: true,
	})
	password: string;
}
