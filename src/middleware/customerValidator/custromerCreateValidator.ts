import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../utils/types";

/**
 * @param req Request
 * @param res Response
 * @param next Next Function
 */
export default async function userLoginValidator(
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

  const { customer } = req.body;
  if (!customer) {
    errors.body.push("customer object must be defined");
    return res.status(400).json({ errors });
  }

  const { name } = customer;

  if (!name) {
    errors.body.push("name property in customer can't be empty");
  } else if (typeof name != "string") {
    errors.body.push("name property in customer must be a string");
  }

  if (errors.body.length) return res.status(400).json({ errors });
  next();
}