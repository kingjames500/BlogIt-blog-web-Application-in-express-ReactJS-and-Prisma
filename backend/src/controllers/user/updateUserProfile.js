import { PrismaClient } from "../../imports/imports.js";
import { checkIfEmailExists } from "../../middleware/utils/userExists.js";

const client = new PrismaClient();

async function updateUserProfile(req, res) {
  const profileId = req.params.profileId;

  const { bio, status, occupation, secondaryEmail, phoneNumber } = req.body;
  try {
    const secondaryEmailExists = await checkIfEmailExists(secondaryEmail);

    if (secondaryEmailExists) {
      res.status(400).json({ message: "Secondary Email already exists" });
      return;
    }
    await client.profile.update({
      where: {
        id: profileId,
      },
      data: {
        bio: bio,
        status: status,
        occupation: occupation,
        secondaryEmail: secondaryEmail,
        phoneNumber: phoneNumber,
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
