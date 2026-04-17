import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateAtMessage1776384243417 implements MigrationInterface {
	name = 'CreateAtMessage1776384243417'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "message" ADD "created_at" TIMESTAMP NOT NULL`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "created_at"`)
	}
}
