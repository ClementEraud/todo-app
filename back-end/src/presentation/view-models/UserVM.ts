import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../domain/models/user/user';

export class UserVM {
  @ApiProperty({
    description: 'ID of user.',
    example: 1,
  })
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  constructor(id: number, firstName: string, lastName: string) {
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
