import { PrismaClient } from "../imports/imports.js";

// Middleware to check if the user input is valid
const client = new PrismaClient();

async function validateUserInputInformation(req, res, next) {
  const { email, password, firstName, lastName, username } = req.body;

  if (!firstName) {
    res.status(400).json({ message: "First Name is required" });
    return;
  }
  if (!lastName) {
    res.status(400).json({ message: "Last Name is required" });
    return;
  }
  if (!password) {
    res.status(400).json({ message: "Password is required" });
    return;
  }
  if (!username) {
    res.status(400).json({ message: "Username is required" });
    return;
  }
  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }

  const emailExists = await client.user.findFirst({ where: { email: email } });
  if (emailExists) {
    res.status(400).json({ message: "Email already exists" });
    return;
  }

  const usernameExists = await client.user.findFirst({
    where: { username: username },
  });
  if (usernameExists) {
    res.status(400).json({ message: "Username already exists" });
    return;
  }

  next();
}

export default validateUserInputInformation;
