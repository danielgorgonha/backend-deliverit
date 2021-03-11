import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { BillsToPaysRepository } from "../repositories/BillsToPaysRepository";
import { DelayRulesBillsToPaysRepository } from "../repositories/DelayRulesBillsToPaysRepository";
import DelayRuleService from "../services/DelayRuleService";
import { DiffDate } from "../utils/DiffDate";

class BillsToPayController {
  async create(request: Request, response: Response) {
    const { name, orginal_value, expiration_date, payment_date } = request.body;

    const billstopayRepository = getCustomRepository(BillsToPaysRepository);

    const billstopay = await billstopayRepository.findOne({
      name
    });

    if (billstopay) {
      return response.status(400).json({
        error: "Bill to pay already exists!"
      });
    }

    const billtopay = billstopayRepository.create({
      name,
      orginal_value,
      expiration_date,
      payment_date
    });

    await billstopayRepository.save(billtopay);

    const diffDays = DiffDate(expiration_date);

    if (diffDays) {
      DelayRuleService.execute(diffDays, orginal_value, billtopay.id)
    }

    return response.status(201).json(billtopay);
  }

  async show(request: Request, response: Response) {

    const billsToPayRepository = getCustomRepository(BillsToPaysRepository);
    const delayRulesBillsToPaysRepository = getCustomRepository(DelayRulesBillsToPaysRepository);

    const all = await billsToPayRepository.find(); 
    const fkDelayRuleBillsToPay = await delayRulesBillsToPaysRepository.find();
    const data = [];

    all.filter((thisOne, i) => {
      if (all.indexOf(thisOne) === i) {
        let corrected_value = 0;
        let number_days_late = 0;
        fkDelayRuleBillsToPay.filter((data, index, array) => {
          if (data.billstopay_id === thisOne.id) {
            corrected_value += data.corrected_value;
            number_days_late += data.number_days_late; 
          }
        });

        data.push({
          name: thisOne.name,
          orginal_value: thisOne.orginal_value,
          corrected_value,
          number_days_late,
          payment_date: thisOne.payment_date
        });
      }
    })

    return response.json(data);
  }

  /*async update(request: Request, response: Response) {

  }

  async delete(request: Request, response: Response) {

  }*/
}

export { BillsToPayController };
