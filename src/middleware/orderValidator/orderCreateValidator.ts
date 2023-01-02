import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../utils/types";

/**
 * @param req Request
 * @param res Response
 * @param next Next Function
 */
export default async function orderCreateValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors: ValidationError = {};
  errors.body = [];
  if (!req.body) {
    errors.body.push("can't be empty");
    return res.status(400).json({ errors });
  }

  const { order } = req.body;
  if (!order) {
    errors.body.push("order object must be defined");
    return res.status(400).json({ errors });
  }

  const { customer, kilos } = order;
  if (!kilos) {
    errors.body.push("kilos property in order can't be empty");
  } else if (typeof kilos != "number") {
    errors.body.push("name property in customer must be a number");
  }

  if (errors.body.length) return res.status(400).json({ errors });
  next();
}