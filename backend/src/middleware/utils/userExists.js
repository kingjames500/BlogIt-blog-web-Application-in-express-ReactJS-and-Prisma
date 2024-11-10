import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const client = new PrismaClient();

const findUserByEmailOrUsername = async (emailOrUsername) => {
  return await client.user.findFirst({
    where: {
      OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
    },
  });
};

const comparePasswords = async (inputPassword, storedPassword) => {
  return await bcrypt.compare(inputPassword, storedPassword);
};

export { findUserByEmailOrUsername, comparePasswords };
