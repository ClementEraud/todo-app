import { IUsersRepository } from '../../../use_cases/ports/UsersRepository.interface';
import { User } from '../../../domain/user/user';
import { UpdateUserDto } from '../../../use_cases/dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../mapper/user.entity';
import { CreateUserDto } from '../../../use_cases/dto/create-user.dto';

export class UsersRepository implements IUsersRepository {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<UserEntity>,
    ) {}

    fromEntity(user: UserEntity): User {
        return new User(user.id, user.firstName, user.lastName);
    }

    async save(user: CreateUserDto): Promise<User> {
        return this.fromEntity(this.usersRepository.create(user));
    }

    async findAll(): Promise<User[]> {
        const users = await this.usersRepository.find();
        return users.map(this.fromEntity)
    }

    async findOne(userId: string): Promise<User> {
       const userEntity = await this.usersRepository.findOne(userId);
       return this.fromEntity(userEntity);
    }

    async update(userId: string, updateUser: UpdateUserDto): Promise<User> {
        await this.usersRepository.update({id: userId}, updateUser);
        return this.findOne(userId);
    }

    async remove(userId: string): Promise<boolean> {
        try {
            const userToRemove = await this.usersRepository.findOne(userId);
            await this.usersRepository.remove(userToRemove);
        }
        catch {
            return false;
        }

        return true;
    }
}
