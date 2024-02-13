import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserAndPhotoEntities1707773251028
  implements MigrationInterface
{
  name = 'CreateUserAndPhotoEntities1707773251028';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "photo" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "clientId" integer, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "fullName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "avatar" character varying, "type" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_31ef2b4d30675d0c15056b7f6e" ON "user" ("type") `,
    );
    await queryRunner.query(
      `ALTER TABLE "photo" ADD CONSTRAINT "FK_127a5532d24658ac9442b901286" FOREIGN KEY ("clientId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "photo" DROP CONSTRAINT "FK_127a5532d24658ac9442b901286"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_31ef2b4d30675d0c15056b7f6e"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "photo"`);
  }
}
