
import prisma from "../prisma";

export default async function userCreatePrisma(
  name: string,
  password: string
) {
  const user = await prisma.user.create({
    data: { name, password },
  });
  return user;
}