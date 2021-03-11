import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateDelayRule1615313347227 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "delayrules",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "title",
                        type: "varchar",
                    },
                    {
                        name: "equality",
                        type: "varchar",
                    },
                    {
                        name: "day",
                        type: "number",
                    },
                    {
                        name: "penalty_value",
                        type: "number",
                    },
                    {
                        name: "interest_per_day",
                        type: "number",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("delayrules");
    }

}
