/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1620812469281 implements MigrationInterface {
  name = 'CreateUsersTable1620812469281';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE TABLE "users"
        (
            "id"         UUID NOT NULL DEFAULT Uuid_generate_v4(),
            "name"       CHARACTER VARYING NOT NULL,
            "email"      CHARACTER VARYING NOT NULL,
            "password"   CHARACTER VARYING NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT Now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT Now(),
            "version"    INTEGER NOT NULL,
            CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
        ) 
      `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_97672ac88f789774dd47f7c8be"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
