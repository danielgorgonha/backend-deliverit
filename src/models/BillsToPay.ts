import { Column, CreateDateColumn, Entity, IsNull, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("billstopays")
class BillsToPay {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  orginal_value: number;

  @Column()
  expiration_date: string;

  @Column()
  payment_date: string;

  @Column()
  corrected_value: number;

  @Column()
  number_days_late: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
} 

export { BillsToPay };