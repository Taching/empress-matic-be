
import prisma from "../prisma";

export default async function customerCreatePrisma(
  name: string,
  address: string,
  phoneNumber: number,
) {
  const customer = await prisma.customer.create({
    data: { name, address, phoneNumber }
  });
  return customer;
}