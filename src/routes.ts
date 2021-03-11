import { Router } from "express";
import { BillsToPayController } from "./controllers/BillsToPayController";
import { DelayRuleController } from "./controllers/DelayRuleController";

const router = Router();

const billtopayController = new BillsToPayController();
const delayruleController = new DelayRuleController();

router.post('/billtopay', billtopayController.create);
router.get('/billtopay', billtopayController.show);

router.post('/delayrule', delayruleController.create);


export { router };
