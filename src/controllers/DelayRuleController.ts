import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { DelayRulesRepository } from "../repositories/DelayRulesRepository";


class DelayRuleController {
  async create(request: Request, response: Response) {
    const { delayed_days, penalty_value, interest_per_day } = request.body;

    const delayruleRepository = getCustomRepository(DelayRulesRepository);

    const delayruleAlreadyExists = await delayruleRepository.findOne({
      delayed_days
    });

    if (delayruleAlreadyExists) {
      return response.status(400).json({
        error: "delayed day already exists!"
      });
    }

    const delayrule = delayruleRepository.create({
      delayed_days,
      penalty_value,
      interest_per_day,
    });

    await delayruleRepository.save(delayrule);

    return response.status(201).json(delayrule);
  }

  /*async show(request: Request, response: Response) {

  }

  async update(request: Request, response: Response) {

  }

  async delete(request: Request, response: Response) {

  }*/

}

export { DelayRuleController };