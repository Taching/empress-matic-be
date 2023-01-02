import prisma from "../prisma";

export default async function customerGetPrisma(name: string, id: number) {
  const findCustomer = await prisma.customer.findFirst({
    where: { name, id }
  });
  return findCustomer;
}