const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class CreateUserAndTaskTables1633376631262 {
	name = 'CreateUserAndTaskTables1633376631262';

	async up(queryRunner) {
		await queryRunner.query(
			`CREATE TABLE \`todo\`.\`task\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`todo\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`ALTER TABLE \`todo\`.\`task\` ADD CONSTRAINT \`FK_f316d3fe53497d4d8a2957db8b9\` FOREIGN KEY (\`userId\`) REFERENCES \`todo\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE \`todo\`.\`task\` DROP FOREIGN KEY \`FK_f316d3fe53497d4d8a2957db8b9\``,
		);
		await queryRunner.query(`DROP TABLE \`todo\`.\`user\``);
		await queryRunner.query(`DROP TABLE \`todo\`.\`task\``);
	}
};
