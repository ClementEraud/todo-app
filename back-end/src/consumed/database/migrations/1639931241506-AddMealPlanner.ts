import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMealPlanner1639931241506 implements MigrationInterface {
	name = 'AddMealPlanner1639931241506';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'ALTER TABLE `todo`.`task` DROP FOREIGN KEY `fk_task_user`',
		);
		await queryRunner.query(
			'CREATE TABLE `todo`.`meal_of_the_day` (`id` varchar(255) NOT NULL, `lunch` varchar(255) NULL, `dinner` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
		);
		await queryRunner.query(
			'CREATE TABLE `todo`.`meal_planner` (`id` varchar(255) NOT NULL, `mondayId` varchar(255) NULL, `tuesdayId` varchar(255) NULL, `wednesdayId` varchar(255) NULL, `thursdayId` varchar(255) NULL, `fridayId` varchar(255) NULL, `saturdayId` varchar(255) NULL, `sundayId` varchar(255) NULL, UNIQUE INDEX `REL_6ade86f39c08dd50bad6a78556` (`mondayId`), UNIQUE INDEX `REL_a9bad50e84606518a25af6b464` (`tuesdayId`), UNIQUE INDEX `REL_ef681767a303b377e38aa922ad` (`wednesdayId`), UNIQUE INDEX `REL_08332df2255ad4dcd34220a568` (`thursdayId`), UNIQUE INDEX `REL_b0db9fd0d2fd829f1c5c9d4e77` (`fridayId`), UNIQUE INDEX `REL_bc9af74149c96cbb3a510b5344` (`saturdayId`), UNIQUE INDEX `REL_eae7090647f14dd7041a5a667e` (`sundayId`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`user` ADD `mealPlannerId` varchar(255) NULL',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`user` ADD UNIQUE INDEX `IDX_584f8429378a3d2dd7b41ac134` (`mealPlannerId`)',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`task` CHANGE `userId` `userId` varchar(255) NULL',
		);
		await queryRunner.query(
			'CREATE UNIQUE INDEX `REL_584f8429378a3d2dd7b41ac134` ON `todo`.`user` (`mealPlannerId`)',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`meal_planner` ADD CONSTRAINT `FK_6ade86f39c08dd50bad6a785566` FOREIGN KEY (`mondayId`) REFERENCES `todo`.`meal_of_the_day`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`meal_planner` ADD CONSTRAINT `FK_a9bad50e84606518a25af6b4643` FOREIGN KEY (`tuesdayId`) REFERENCES `todo`.`meal_of_the_day`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`meal_planner` ADD CONSTRAINT `FK_ef681767a303b377e38aa922add` FOREIGN KEY (`wednesdayId`) REFERENCES `todo`.`meal_of_the_day`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`meal_planner` ADD CONSTRAINT `FK_08332df2255ad4dcd34220a568f` FOREIGN KEY (`thursdayId`) REFERENCES `todo`.`meal_of_the_day`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`meal_planner` ADD CONSTRAINT `FK_b0db9fd0d2fd829f1c5c9d4e779` FOREIGN KEY (`fridayId`) REFERENCES `todo`.`meal_of_the_day`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`meal_planner` ADD CONSTRAINT `FK_bc9af74149c96cbb3a510b53441` FOREIGN KEY (`saturdayId`) REFERENCES `todo`.`meal_of_the_day`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`meal_planner` ADD CONSTRAINT `FK_eae7090647f14dd7041a5a667e4` FOREIGN KEY (`sundayId`) REFERENCES `todo`.`meal_of_the_day`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`task` ADD CONSTRAINT `FK_f316d3fe53497d4d8a2957db8b9` FOREIGN KEY (`userId`) REFERENCES `todo`.`user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`user` ADD CONSTRAINT `FK_584f8429378a3d2dd7b41ac1343` FOREIGN KEY (`mealPlannerId`) REFERENCES `todo`.`meal_planner`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'ALTER TABLE `todo`.`user` DROP FOREIGN KEY `FK_584f8429378a3d2dd7b41ac1343`',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`task` DROP FOREIGN KEY `FK_f316d3fe53497d4d8a2957db8b9`',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`meal_planner` DROP FOREIGN KEY `FK_eae7090647f14dd7041a5a667e4`',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`meal_planner` DROP FOREIGN KEY `FK_bc9af74149c96cbb3a510b53441`',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`meal_planner` DROP FOREIGN KEY `FK_b0db9fd0d2fd829f1c5c9d4e779`',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`meal_planner` DROP FOREIGN KEY `FK_08332df2255ad4dcd34220a568f`',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`meal_planner` DROP FOREIGN KEY `FK_ef681767a303b377e38aa922add`',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`meal_planner` DROP FOREIGN KEY `FK_a9bad50e84606518a25af6b4643`',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`meal_planner` DROP FOREIGN KEY `FK_6ade86f39c08dd50bad6a785566`',
		);
		await queryRunner.query(
			'DROP INDEX `REL_584f8429378a3d2dd7b41ac134` ON `todo`.`user`',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`task` CHANGE `userId` `userId` varchar(255) NOT NULL',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`user` DROP INDEX `IDX_584f8429378a3d2dd7b41ac134`',
		);
		await queryRunner.query(
			'ALTER TABLE `todo`.`user` DROP COLUMN `mealPlannerId`',
		);
		await queryRunner.query(
			'DROP INDEX `REL_eae7090647f14dd7041a5a667e` ON `todo`.`meal_planner`',
		);
		await queryRunner.query(
			'DROP INDEX `REL_bc9af74149c96cbb3a510b5344` ON `todo`.`meal_planner`',
		);
		await queryRunner.query(
			'DROP INDEX `REL_b0db9fd0d2fd829f1c5c9d4e77` ON `todo`.`meal_planner`',
		);
		await queryRunner.query(
			'DROP INDEX `REL_08332df2255ad4dcd34220a568` ON `todo`.`meal_planner`',
		);
		await queryRunner.query(
			'DROP INDEX `REL_ef681767a303b377e38aa922ad` ON `todo`.`meal_planner`',
		);
		await queryRunner.query(
			'DROP INDEX `REL_a9bad50e84606518a25af6b464` ON `todo`.`meal_planner`',
		);
		await queryRunner.query(
			'DROP INDEX `REL_6ade86f39c08dd50bad6a78556` ON `todo`.`meal_planner`',
		);
		await queryRunner.query('DROP TABLE `todo`.`meal_planner`');
		await queryRunner.query('DROP TABLE `todo`.`meal_of_the_day`');
		await queryRunner.query(
			'ALTER TABLE `todo`.`task` ADD CONSTRAINT `fk_task_user` FOREIGN KEY (`userId`) REFERENCES `todo`.`user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
	}
}
