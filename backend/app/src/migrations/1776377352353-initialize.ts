import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initialize1776377352353 implements MigrationInterface {
	name = 'Initialize1776377352353'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "chat" ("id" character varying(32) NOT NULL, "title" character varying(255) NOT NULL, CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`,
		)
		await queryRunner.query(
			`CREATE TABLE "message" ("id" character varying(32) NOT NULL, "text" character varying NOT NULL, "author" character varying(255) NOT NULL, "chat_id" character varying(32), CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`,
		)
		await queryRunner.query(
			`ALTER TABLE "message" ADD CONSTRAINT "FK_859ffc7f95098efb4d84d50c632" FOREIGN KEY ("chat_id") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "message" DROP CONSTRAINT "FK_859ffc7f95098efb4d84d50c632"`,
		)
		await queryRunner.query(`DROP TABLE "message"`)
		await queryRunner.query(`DROP TABLE "chat"`)
	}
}
