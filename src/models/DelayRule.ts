import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("delayrules")
class DelayRule {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  title: string;

  @Column()
  equality: string;

  @Column()
  day: number;

  @Column()
  penalty_value: number;

  @Column()
  interest_per_day: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { DelayRule };
