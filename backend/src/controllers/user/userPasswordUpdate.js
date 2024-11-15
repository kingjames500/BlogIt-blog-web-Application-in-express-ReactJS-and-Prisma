import { PrismaClient } from "../../imports/imports.js";
import bcrypt from "bcryptjs";
import { comparePasswords } from "../../middleware/utils/userExists.js";

const client = new PrismaClient();

const userPasswordUpdate = async (req, res) => {
  try {
    const userId = req.userId;
    const { previousPassword, newPassword } = req.body;

    if (!user) {
      res
        .status(400)
        .json({ message: "something went wrong, please try again later" });
      return;
    }

    const passwordMatch = await comparePasswords(
      previousPassword,
      user.password,
    );

    if (passwordMatch) {
      const hashedPassword = await bcrypt.hash(newPassword, 8);
      await client.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      res.status(200).json({ message: "Password updated successfully" });
      return;
    }

    res.status(400).json({ message: "Old password is incorrect" });
    return;
  } catch (error) {
    res
      .status(500)
      .send({ message: "something went wrong! Please try again later" });
    return;
  }
};

export default userPasswordUpdate;
