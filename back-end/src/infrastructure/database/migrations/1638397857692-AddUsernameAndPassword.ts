import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsernameAndPassword1638397857692 implements MigrationInterface {
	name = 'AddUsernameAndPassword1638397857692';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'ALTER TABLE `todo`.`user` ADD `username` varchar(255) NOT NULL',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`user` ADD `password` varchar(255) NOT NULL',
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE `todo`.`user` DROP COLUMN `password`');
		await queryRunner.query('ALTER TABLE `todo`.`user` DROP COLUMN `username`');
	}
}
