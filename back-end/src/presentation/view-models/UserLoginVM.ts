import { ApiProperty } from '@nestjs/swagger';

export class UserLoginVM {
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
