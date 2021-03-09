import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { BillsToPay } from "../models/BillsToPay";

class BillsToPayController {
  async create(request: Request, response: Response) {
    const { name, orginalValue, expirationDate } = request.body;

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
      orginalValue,
      expirationDate
    });

    await billstopayRepository.save(billtopay);

    return response.status(201).json(billtopay);
  }
}

export { BillsToPayController };