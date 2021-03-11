import { AppError } from "../errors/AppError";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { DelayRulesRepository } from "../repositories/DelayRulesRepository";

import * as yup from 'yup';

class DelayRuleController {
  async create(request: Request, response: Response) {
    const { title, equality, day, penalty_value, interest_per_day } = request.body;
    const schema = yup.object().shape({
      title: yup.string().required(),
      equality: yup.string().required(),
      day: yup.number().required(),
      penalty_value: yup.number().required(),
      interest_per_day: yup.number().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch(err) {
      throw new AppError(err);
    }

    const delayruleRepository = getCustomRepository(DelayRulesRepository);

    const delayruleAlreadyExists = await delayruleRepository.findOne({
      where: [{ title, equality, day }]
    });

    if (delayruleAlreadyExists) {
      throw new AppError("delayed day already exists!");
    }

    const delayrule = delayruleRepository.create({
      title,
      equality,
      day,
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
