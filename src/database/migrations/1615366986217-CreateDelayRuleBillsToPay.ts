import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateDelayRuleBillsToPay1615366986217 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "delayrules_billstopays",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "billstopay_id",
                        type: "uuid",
                    },
                    {
                        name: "delayrule_id",
                        type: "uuid",
                    },
                    {
                        name: "corrected_value",
                        type: "number",
                        isNullable: true,
                    },
                    {
                        name: "number_days_late",
                        type: "number",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKBillsToPay",
                        referencedTableName: "billstopays",
                        referencedColumnNames: ["id"],
                        columnNames: ["billstopay_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                    {
                        name: "FKDelayRule",
                        referencedTableName: "delayrules",
                        referencedColumnNames: ["id"],
                        columnNames: ["delayrule_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("delayrules_billstopays")
    }

}
