import { PrismaClient } from "../../imports/imports.js";

const client = new PrismaClient();

const createUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      bio,
      phoneNumber,
      status,
      occupation,
      secondaryEmail,
      profileImageUrl,
    } = req.body;

    const findUser = await client.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!findUser) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const createUserProfile = await client.profile.create({
      data: {
        bio: bio,
        phoneNumber: phoneNumber,
        status: status,
        occupation: occupation,
        secondaryEmail: secondaryEmail,
        profileImageUrl: profileImageUrl,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    res.status(200).json({
      message: "User profile created successfully",
      data: createUserProfile,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "something went wrong! Please try again later" });
    return;
  }
};

export default createUserProfile;
