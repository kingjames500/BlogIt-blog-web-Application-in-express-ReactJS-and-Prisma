import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const client = new PrismaClient();

// Find user by email or username
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

// Check if email exists
const checkIfEmailExists = async (email) => {
  return await client.user.findFirst({ where: { email: email } });
};

export { findUserByEmailOrUsername, comparePasswords, checkIfEmailExists };
