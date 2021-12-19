import { ApiProperty } from '@nestjs/swagger';

export class UserLoginInput {
	@ApiProperty({
		description: 'Username of user.',
		required: true,
	})
	username: string;

	@ApiProperty({
		description: 'Password of user.',
		required: true,
	})
	password: string;
}
