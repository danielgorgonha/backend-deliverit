import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity("delayrules_billstopays")
class DelayRuleBillsToPay {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  billstopay_id: string;
  
  @Column()
  delayrule_id: string;

  @Column()
  corrected_value: number;

  @Column()
  number_days_late: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { DelayRuleBillsToPay };