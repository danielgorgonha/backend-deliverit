import { Router } from "express";
import { BillsToPayController } from "./controllers/BillsToPayController";

const router = Router();

const billtopayController = new BillsToPayController();

router.post('/billtopay', billtopayController.create);

export { router };