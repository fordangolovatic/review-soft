import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1690877252146 implements MigrationInterface {
    name = 'Migration1690877252146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account_wallet\` DROP FOREIGN KEY \`FK_account_wallet_account\``);
        await queryRunner.query(`ALTER TABLE \`account_wallet\` CHANGE \`user_id\` \`user_id\` int NULL COMMENT 'PK of the table.'`);
        await queryRunner.query(`ALTER TABLE \`account_wallet\` ADD CONSTRAINT \`FK_account_wallet_account\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account_wallet\` DROP FOREIGN KEY \`FK_account_wallet_account\``);
        await queryRunner.query(`ALTER TABLE \`account_wallet\` CHANGE \`user_id\` \`user_id\` int NOT NULL COMMENT 'FK to account table.'`);
        await queryRunner.query(`ALTER TABLE \`account_wallet\` ADD CONSTRAINT \`FK_account_wallet_account\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
