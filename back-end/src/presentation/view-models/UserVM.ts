import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../domain/models/user/user';
import { TaskVM } from './TaskVM';

export class UserVM {
  @ApiProperty({
  	description: 'ID of user.',
  	example: 1,
  })
  id: number;

  @ApiProperty({
  	description: 'First name of user.',
  	example: 'Barry',
  })
  firstName: string;

  @ApiProperty({
  	description: 'Last name of user.',
  	example: 'West',
  })
  lastName: string;

  @ApiProperty({
  	description: 'Tasks of user.',
  	example: `[
      {id: 1, title: 'Title', description: 'Description of task 1'},
      {id: 2, title: 'Title2', description: 'Description of task 2'},
      {id: 3, title: 'Title3', description: 'Description of task 3'},
    ]`,
  })
  tasks?: TaskVM[]

  constructor(id: number, firstName: string, lastName: string, tasks?: TaskVM[]) {
  	this.id = id;
  	this.firstName = firstName;
  	this.lastName = lastName;
  	this.tasks = tasks;
  }

  static toViewModel(user: User): UserVM {
  	return new UserVM(
  		user.id,
  		user.firstName,
  		user.lastName,
  		user.tasks ? user.tasks.map(TaskVM.toViewModel) : []
  	)
  }
}
