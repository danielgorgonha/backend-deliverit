import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateBillsToPay1615284393778 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "billstopays",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "orginal_value",
                        type: "number",
                    },
                    {
                        name: "expiration_date",
                        type: "timestamp",
                    },
                    {
                        name: "payment_date",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("billstopays");
    }

}
