import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1690991149951 implements MigrationInterface {
    name = 'Migration1690991149951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account_wallet\` DROP FOREIGN KEY \`FK_account_wallet_account\``);
        await queryRunner.query(`ALTER TABLE \`account_wallet\` CHANGE \`user_id\` \`user_id\` int NULL COMMENT 'PK of the table.'`);
        await queryRunner.query(`ALTER TABLE \`consultation_session\` DROP COLUMN \`chat_start_time\``);
        await queryRunner.query(`ALTER TABLE \`consultation_session\` ADD \`chat_start_time\` datetime NOT NULL COMMENT 'Chat start date and time of the consultation.'`);
        await queryRunner.query(`ALTER TABLE \`consultation_session\` DROP COLUMN \`chat_end_time\``);
        await queryRunner.query(`ALTER TABLE \`consultation_session\` ADD \`chat_end_time\` datetime NULL COMMENT 'Chat end date and time of the consultation.'`);
        await queryRunner.query(`ALTER TABLE \`account_wallet\` ADD CONSTRAINT \`FK_account_wallet_account\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account_wallet\` DROP FOREIGN KEY \`FK_account_wallet_account\``);
        await queryRunner.query(`ALTER TABLE \`consultation_session\` DROP COLUMN \`chat_end_time\``);
        await queryRunner.query(`ALTER TABLE \`consultation_session\` ADD \`chat_end_time\` varchar(255) NULL COMMENT 'Chat end date and time of the consultation.'`);
        await queryRunner.query(`ALTER TABLE \`consultation_session\` DROP COLUMN \`chat_start_time\``);
        await queryRunner.query(`ALTER TABLE \`consultation_session\` ADD \`chat_start_time\` varchar(255) NOT NULL COMMENT 'Chat start date and time of the consultation.'`);
        await queryRunner.query(`ALTER TABLE \`account_wallet\` CHANGE \`user_id\` \`user_id\` int NOT NULL COMMENT 'FK to account table.'`);
        await queryRunner.query(`ALTER TABLE \`account_wallet\` ADD CONSTRAINT \`FK_account_wallet_account\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
