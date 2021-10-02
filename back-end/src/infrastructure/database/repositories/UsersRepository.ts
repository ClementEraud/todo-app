import { IUsersRepository } from '../../../application/ports/UsersRepository.interface';
import { User } from '../../../domain/models/user/user';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, EntityManager, QueryRunner } from 'typeorm';
import { UserSchema } from '../mapper/UserSchema';
import { CreateUserDto } from '../../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../../application/dto/update-user.dto';

export class UsersRepository implements IUsersRepository {
    readonly manager: EntityManager;
    readonly queryRunner?: QueryRunner;

    constructor(@InjectConnection() connection: Connection) {
        this.queryRunner = connection.createQueryRunner();
        this.manager = this.queryRunner.manager;
    }

    fromEntity(user: User): User {
        return new User(user.id, user.firstName, user.lastName);
    }

    async save(user: CreateUserDto): Promise<User> {
        const newUser = this.manager.create(
            UserSchema,
            user
        );
        return this.fromEntity(newUser);
    }

    async findAll(): Promise<User[]> {
        const users = await this.manager.find(UserSchema);
        return users.map(this.fromEntity);
    }

    async findOne(userId: number): Promise<User> {
       const userEntity = await this.manager.findOne(UserSchema, userId);
       return this.fromEntity(userEntity);
    }

    async update(userId: number, updateUser: UpdateUserDto): Promise<User> {
        await this.manager.update(UserSchema, {id: userId}, updateUser);
        return this.findOne(userId);
    }

    async remove(userId: number): Promise<boolean> {
        try {
            const userToRemove = await this.manager.findOne(UserSchema, userId);
            await this.manager.remove(UserSchema, userToRemove);
        }
        catch {
            return false;
        }

        return true;
    }
}
