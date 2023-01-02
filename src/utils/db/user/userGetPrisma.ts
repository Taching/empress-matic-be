import prisma from "../prisma";

export default async function userGetPrisma(username: string) {
  const findUser = await prisma.user.findFirst({
    where: { name: username }
  });
  return findUser;
}