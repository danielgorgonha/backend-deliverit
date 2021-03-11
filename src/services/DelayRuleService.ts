import { getCustomRepository } from "typeorm";
import { DelayRulesBillsToPaysRepository } from "../repositories/DelayRulesBillsToPaysRepository";
import { DelayRulesRepository } from "../repositories/DelayRulesRepository";

class DelayRuleService {

  async execute(diffDays: number, original_value: number, billtopayId: string) {

    const delayRuleRepository = getCustomRepository(DelayRulesRepository);
    const delayRulesBillsToPaysRepository = getCustomRepository(DelayRulesBillsToPaysRepository);
    const array = [];

    const delayRules = await delayRuleRepository.find();

    delayRules.map((res) => {
      if (res.equality === "Equal" && diffDays == res.day) {
        array.push(res)
      } else if (res.equality === "MoreThan" && diffDays > res.day) {
        array.push(res)
      } else if (res.equality === "MoreThanOrEqual" && diffDays >= res.day) {
        array.push(res)
      }
    });

    const number_days_late = (original_value * array[array.length - 1].interest_per_day / 100) * diffDays
    const corrected_value = (original_value + (original_value * array[array.length - 1].penalty_value / 100)) + number_days_late

    const delayRuleBillToPay = delayRulesBillsToPaysRepository.create({
      billstopay_id: billtopayId,
      delayrule_id: array[array.length - 1].id,
      corrected_value,
      number_days_late
    });

    await delayRulesBillsToPaysRepository.save(delayRuleBillToPay);
  }
}

export default new DelayRuleService();
