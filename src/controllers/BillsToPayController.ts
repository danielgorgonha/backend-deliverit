import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { BillsToPay } from "../models/BillsToPay";

class BillsToPayController {
  async create(request: Request, response: Response) {
    const { name, orginal_value, expiration_date, payment_date } = request.body;

    const billstopayRepository = getRepository(BillsToPay);

    const billstopayAlreadyExists = await billstopayRepository.findOne({
      name
    });

    if (billstopayAlreadyExists) {
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

    return response.status(201).json(billtopay);
  }
}

export { BillsToPayController };