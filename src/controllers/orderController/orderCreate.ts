import { NextFunction, Response } from "express";
import { User, Customer } from "@prisma/client";
import { Request } from "express-jwt";
import orderCreatePrisma from "../../utils/db/order/orderCreatePrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import customerGetPrisma from "../../utils/db/customer/customerGetPrisma";
import orderViewer from "../../view/orderViewer";

interface Order {
  customer: Customer,
  user: User,
  unit: string,
  paid: false,
  kilos: number,
  wash?: number,
  dry?: number,
  fold?: number,
  liquidsoap?: number,
  cellophane?: number,
  pickupdeliver?: number,
}

/**

 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function orderCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { customer, unit, kilos, wash, dry, fold, cellophane, liquidsoap, pickupdeliver }: Order = req.body.order;
  const userName = req.auth?.user?.username;
  try {
    // Get current user
    const currentUser = await userGetPrisma(userName);
    if (!currentUser) return res.sendStatus(401);
    const currentCustomer = await customerGetPrisma(customer.name, customer.id)
    if (!currentCustomer) return res.sendStatus(402);
    // Create the order
    const order = await orderCreatePrisma(
      currentUser.name,
      currentCustomer.id,
      { unit, kilos, wash, dry, fold, cellophane, liquidsoap, pickupdeliver}
    );

    // Create order view
    const orderView = orderViewer(order);
    return res.status(201).json({ order: orderView });
  } catch (error) {
    return next(error);
  }
}
