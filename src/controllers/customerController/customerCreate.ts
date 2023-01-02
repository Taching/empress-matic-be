import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import customerCreatePrisma from "../../utils/db/customer/customerCreatePrisma";
import customerViewer from "../../view/customerViewer"
interface Customer {
  name: string,
  address: string,
  phoneNumber: number
}

/**
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function customerCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, address, phoneNumber }: Customer = req.body.customer;
  const userName = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(userName);
    if (!currentUser) return res.sendStatus(401);
    if (currentUser.role == "STAFF") return res.sendStatus(401)
    // Create the customer
    const customer = await customerCreatePrisma(
       name, address, phoneNumber
    );

    // Create customer view
    const customerView = customerViewer(customer);
    return res.status(201).json({ customer: customerView });
  } catch (error) {
    return next(error);
  }
}
