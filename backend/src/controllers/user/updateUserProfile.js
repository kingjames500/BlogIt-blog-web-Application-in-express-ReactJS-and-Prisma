import { PrismaClient } from "../../imports/imports.js";

const client = new PrismaClient();

async function updateUserProfile(req, res) {
  const profileId = req.params.profileId;
  const userId = req.userId;
  console.log(userId);

  const {
    bio,
    status,
    occupation,
    secondaryEmail,
    phoneNumber,
    profileImageUrl,
  } = req.body;
  try {
    await client.profile.update({
      where: {
        id: profileId,
      },
      data: {
        bio,
        status,
        occupation,
        secondaryEmail,
        phoneNumber,
        profileImageUrl,
      },
    });

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "something went wrong! Please try again later" });
  }
}

export default updateUserProfile;
