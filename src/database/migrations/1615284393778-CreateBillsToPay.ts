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
                        name: "orginalValue",
                        type: "number",
                    },
                    {
                        name: "expirationDate",
                        type: "timestamp",
                    },
                    {
                        name: "paymentDate",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "correctedValue",
                        type: "number",
                        isNullable: true,
                    },
                    {
                        name: "numberDaysLate",
                        type: "number",
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
