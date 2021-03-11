import { EntityRepository, Repository } from "typeorm";
import { DelayRuleBillsToPay } from "../models/DelayRuleBillsToPay";

@EntityRepository(DelayRuleBillsToPay)
class DelayRulesBillsToPaysRepository extends Repository<DelayRuleBillsToPay> {}

export { DelayRulesBillsToPaysRepository };
