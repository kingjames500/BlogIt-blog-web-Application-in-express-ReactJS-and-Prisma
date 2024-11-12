import { PrismaClient } from "../../imports/imports.js";

const client = new PrismaClient();

// function for updating email, lastname, username
const updateUserInformation = async (req, res) => {
  try {
    const { email, firstName, lastName, username } = req.body;
    const userId = req.userId;

    const checkEmailTakenCheck = await checkIfEmailExists(email);

    if (checkEmailTakenCheck) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const updatedUser = await client.user.update({
      where: { id: userId },
      data: {
        email,
        firstName,
        lastName,
        username,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .send({ message: "something went wrong! Please try again later" });
    return;
  }
};

// function for updating userProfile Information such as bio.

const updateUserProfileData = async (req, res) => {
  try {
    const {
      phoneNumber,
      secondaryEmail,
      bio,
      occupation,
      status,
      profileImageUrl,
    } = req.body;

    const userId = req.userId;

    const user = await client.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res
        .status(400)
        .json({ message: "there was an arror while trying to update" });
      return;
    }

    const secondaryEmailExists = await checkIfEmailExists(secondaryEmail);

    if (secondaryEmailExists) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const updateUserProfile = await client.profile.update({
      where: {
        userId: userId,
      },
      data: {
        profileImageUrl,
        phoneNumber,
        bio,
        status,
        secondaryEmail,
        occupation,
      },
    });

    res.status(200).json({
      message: "Profile updated succesfully!",
      data: updateUserProfile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};

export { updateUserInformation, updateUserProfileData };
