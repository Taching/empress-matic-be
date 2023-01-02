import { Router } from "express";
import { orderCreate } from "../../controllers/orderController"
import * as validator from "../../middleware/orderValidator";

const router = Router();

router.post("/", validator.orderCreateValidator, orderCreate);

export default router;
