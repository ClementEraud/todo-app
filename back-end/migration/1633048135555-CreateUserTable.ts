import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateUserTable1633048135555 implements MigrationInterface {
    name = 'CreateUserTable1633048135555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE `todo`.`user` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `todo`.`user`');
    }

}
