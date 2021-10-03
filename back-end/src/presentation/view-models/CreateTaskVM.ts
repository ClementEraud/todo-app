import { ApiProperty } from '@nestjs/swagger';
import { CreateTaskDto } from '../../application/dto/create-task.dto';

export class CreateTaskVM implements CreateTaskDto {
  @ApiProperty({
  	description: 'Title of task',
  	required: true
  })
  title: string;
  
  @ApiProperty({
  	description: 'Description of task',
  	required: true
  })
  description: string;
}
