/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePastesTable1620842878119 implements MigrationInterface {
  name = 'CreatePastesTable1620842878119';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE TABLE "pastes" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "title" character varying NOT NULL,
          "content" text NOT NULL,
          "short_code" character varying NOT NULL,
          "expiry_date" TIMESTAMP WITH TIME ZONE,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
          "user_id" uuid,
          CONSTRAINT "PK_2c805f81f77079615df0bdc6c1e" PRIMARY KEY ("id")
        )
      `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_SHORTCODE_EXPIRY_DATE" ON "pastes" ("short_code", "expiry_date") `,
    );
    await queryRunner.query(
      `
        ALTER TABLE
            "pastes"
        ADD
            CONSTRAINT "FK_41ee802eea96f641274193db722" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE
        SET
            NULL ON UPDATE NO ACTION
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pastes" DROP CONSTRAINT "FK_41ee802eea96f641274193db722"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_SHORTCODE_EXPIRY_DATE"`);
    await queryRunner.query(`DROP TABLE "pastes"`);
  }
}
