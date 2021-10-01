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
import { User } from '../../../domain/user/user';
import { CreateUserDto } from '../../../use_cases/dto/create-user.dto';
import { UpdateUserDto } from '../../../use_cases/dto/update-user.dto';
import { UserService } from '../../../use_cases/user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The User has been successfully created.',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiCreatedResponse({
    description: 'All users in database.',
    type: [User],
  })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({
    description: 'The User has been found.',
    type: User,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({
    description: 'The user has been successfully updated.',
    type: User,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({
    description: 'The user has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
