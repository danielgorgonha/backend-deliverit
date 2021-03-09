import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("billstopays")
class BillsToPay {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  orginalValue: number;

  @CreateDateColumn()
  expirationDate: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
} 

export { BillsToPay };