import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../../domain/models/task/task';

export class TaskVM {
  @ApiProperty({
    description: 'ID of task.',
    example: 1,
  })
  id: number;

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

  constructor(id: number, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

  static toViewModel(task: Task): TaskVM {
    return new TaskVM(
      task.id,
      task.title,
      task.description,
    )
  }
}
