import { Router } from "express";
import { customerCreate } from "../../controllers/customerController"
import * as validator from "../../middleware/customerValidator";

const router = Router();

router.post("/", validator.custromerCreateValidator, customerCreate);

export default router;
