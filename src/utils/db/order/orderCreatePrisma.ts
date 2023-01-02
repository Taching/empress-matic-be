import prisma from "../prisma";
import { User, Customer  } from "@prisma/client";
// interface RequiredFields {
//     customer: Customer,
//     operator: User,
//     unit: string,
//     kilos: number,
// }

export default async function orderCreatePrisma(
  user: any,
  customer: any,
  order: any,
) {
  const jobOrder = await prisma.order.create({
      data: {
        ...order,
        user: { connect: { name: user }},
        customer: { connect: { id: customer }} }
    });
  return jobOrder;
}
