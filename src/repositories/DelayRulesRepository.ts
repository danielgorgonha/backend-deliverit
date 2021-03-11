import { EntityRepository, Repository } from "typeorm";
import { DelayRule } from "../models/DelayRule";

@EntityRepository(DelayRule)
class DelayRulesRepository extends Repository<DelayRule> {}

export { DelayRulesRepository };
