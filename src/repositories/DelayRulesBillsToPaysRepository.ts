import { EntityRepository, Repository } from "typeorm";
import { DelayRuleBillsToPay } from "../models/DelayRuleBillsToPay";

@EntityRepository(DelayRuleBillsToPay)
class DelayRulesBillsToPays extends Repository<DelayRuleBillsToPay> {}

export { DelayRulesBillsToPays };