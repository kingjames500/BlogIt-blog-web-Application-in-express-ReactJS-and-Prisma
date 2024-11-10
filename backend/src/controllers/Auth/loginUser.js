import jwt from "jsonwebtoken";
import {
  findUserByEmailOrUsername,
  comparePasswords,
} from "../../middleware/utils/userExists.js";

const loginUser = async (req, res) => {
  try {
    const emailOrUsername = req.body.emailOrUsername;
    const password = req.body.password;

    if (!emailOrUsername || !password) {
      return res
        .status(400)
        .json({ message: "Email/Username and password are required." });
    }

    const user = await findUserByEmailOrUsername(emailOrUsername);

    if (!user) {
      return res.status(401).json({ message: "email or password not correct" });
    }

    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "email or password not correct " });
    }

    // Generate token and return response
    const accessToken = jwt.sign(user.id, process.env.JWT_SECRET);
    res
      .status(200)
      .cookie("authToken", accessToken, { httpOnly: true })
      .json(user);
  } catch (error) {
    res.status(500).json({ message: "something went wrong! Try again later" });
  }
};

export default loginUser;
