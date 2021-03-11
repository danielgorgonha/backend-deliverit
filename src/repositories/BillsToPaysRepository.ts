import { EntityRepository, Repository } from "typeorm";
import { BillsToPay } from "../models/BillsToPay";

@EntityRepository(BillsToPay)
class BillsToPaysRepository extends Repository<BillsToPay> {}

export { BillsToPaysRepository };
