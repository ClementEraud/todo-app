import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../domain/models/user/user';
import { CreateUserVM } from '../view-models/CreateUserVM';
import { UpdateUserVM } from '../view-models/UpdateUserVM';
import { UserUseCases } from '../../application/use_cases/UserUseCases';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The User has been successfully created.',
    type: User,
  })
  create(@Body() createUser: CreateUserVM): Promise<User> {
    return this.userUseCases.create(createUser);
  }

  @Get()
  @ApiCreatedResponse({
    description: 'All users in database.',
    type: [User],
  })
  findAll(): Promise<User[]> {
    return this.userUseCases.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({
    description: 'The User has been found.',
    type: User,
  })
  findOne(@Param('id') id: number) {
    return this.userUseCases.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({
    description: 'The user has been successfully updated.',
    type: User,
  })
  update(@Param('id') id: number, @Body() updateUser: UpdateUserVM) {
    return this.userUseCases.update(id, updateUser);
  }

  @Delete(':id')
  @ApiCreatedResponse({
    description: 'The user has been successfully deleted.',
  })
  remove(@Param('id') id: number) {
    return this.userUseCases.remove(id);
  }
}
