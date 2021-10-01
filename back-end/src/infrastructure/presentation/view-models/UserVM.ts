import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../domain/user/user';

export class UserVM {
  @ApiProperty({
    description: 'ID of user.',
    example: 'fd23687a-01fc-4161-b619-de347cb4f778',
  })
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  constructor(id: string, firstName: string, lastName: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static toViewModel(user: User): UserVM {
    return new UserVM(
      user.id,
      user.firstName,
      user.lastName,
    )
  }
}
