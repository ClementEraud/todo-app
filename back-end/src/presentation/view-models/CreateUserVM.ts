import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../../application/command/create-user.dto';

export class CreateUserVM implements CreateUserDto {
	@ApiProperty({
		description: 'User first name',
		required: true,
	})
	firstName: string;

	@ApiProperty({
		description: 'User last name',
		required: true,
	})
	lastName: string;
}
