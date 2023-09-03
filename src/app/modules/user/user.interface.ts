import prisma from "../../../shared/prisma";

export const UserModel = {
    async isUserExist(email: string | undefined) {
      return prisma.user.findFirst({
        where: {
          email: email || undefined,
        },
        select: {
          id: true,
          email: true,
          password: true,
          role: true,
        },
      });
    },
    async isPasswordMatched(givenPassword: string, savedPassword: string) {
      return givenPassword === savedPassword;
    },
  };