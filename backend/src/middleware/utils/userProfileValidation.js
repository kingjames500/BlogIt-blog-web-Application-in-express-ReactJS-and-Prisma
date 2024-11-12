import { PrismaClient } from "../../imports/imports.js";

const client = new PrismaClient();

async function userProfileValidation(req, res, next) {
  const { secondaryEmail } = req.body;

  const secondaryEmailExists = await client.profile.findFirst({
    where: { secondaryEmail: secondaryEmail },
  });
  if (secondaryEmailExists) {
    res.status(500).json({ message: "email already exists" });
    return;
  }

  next();
}

export default userProfileValidation;
