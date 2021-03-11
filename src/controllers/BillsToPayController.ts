import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { BillsToPaysRepository } from "../repositories/BillsToPaysRepository";
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
}

export { BillsToPayController };
