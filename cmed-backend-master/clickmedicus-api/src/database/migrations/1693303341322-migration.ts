import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1693303341322 implements MigrationInterface {
    name = 'Migration1693303341322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_article_language\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_article_speciality\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`speciality_id\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`language_id\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`passwordResetToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`passwordResetTokenExpires\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`account_wallet\` DROP FOREIGN KEY \`FK_account_wallet_account\``);
        await queryRunner.query(`ALTER TABLE \`account_wallet\` CHANGE \`user_id\` \`user_id\` int NOT NULL COMMENT 'FK to account table.'`);
        await queryRunner.query(`ALTER TABLE \`account_wallet\` ADD CONSTRAINT \`FK_account_wallet_account\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account_wallet\` DROP FOREIGN KEY \`FK_account_wallet_account\``);
        await queryRunner.query(`ALTER TABLE \`account_wallet\` CHANGE \`user_id\` \`user_id\` int NULL COMMENT 'PK of the table.'`);
        await queryRunner.query(`ALTER TABLE \`account_wallet\` ADD CONSTRAINT \`FK_account_wallet_account\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`passwordResetTokenExpires\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`passwordResetToken\``);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`language_id\` int NULL COMMENT 'PK of the table.'`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`speciality_id\` bigint NULL COMMENT 'PK of the table.'`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD CONSTRAINT \`FK_article_speciality\` FOREIGN KEY (\`speciality_id\`) REFERENCES \`speciality\`(\`speciality_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD CONSTRAINT \`FK_article_language\` FOREIGN KEY (\`language_id\`) REFERENCES \`language\`(\`language_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
