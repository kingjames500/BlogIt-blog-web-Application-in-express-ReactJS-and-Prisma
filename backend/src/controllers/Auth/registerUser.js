import { PrismaClient } from "../../imports/imports.js";
import bcrypt from "bcryptjs";

const client = new PrismaClient();

//function to register a user
const registerUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, username } = req.body;
    const passwordHashed = await bcrypt.hash(password, 8);

    const register = await client.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        password: passwordHashed,
      },
    });
    res
      .status(201)
      .json({ message: "User created successfully", data: register });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error while processing your request" });
  }
};

export default registerUser;
