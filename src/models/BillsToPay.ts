import { Column, CreateDateColumn, Entity, IsNull, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("billstopays")
class BillsToPay {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  original_value: number;

  @Column()
  expiration_date: Date;

  @Column()
  payment_date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { BillsToPay };
