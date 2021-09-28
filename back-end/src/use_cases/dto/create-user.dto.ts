import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User first name',
    required: true
  })
  firstName: string;
  
  @ApiProperty({
    description: 'User last name',
    required: true
  })
  lastName: string;
}
