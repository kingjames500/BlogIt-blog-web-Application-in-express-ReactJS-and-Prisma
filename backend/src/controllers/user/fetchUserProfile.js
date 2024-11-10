import e from "express";
import { PrismaClient } from "../../imports/imports.js";

const client = new PrismaClient();

async function fetchUserProfile(req, res) {
  const userId = req.userId;
  try {
    const userProfile = await client.profile.findUnique({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        profileImageUrl: true,
        phoneNumber: true,
        bio: true,
        status: true,
        occupation: true,
        secondaryEmail: true,
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    res.json(userProfile);
  } catch (error) {
    res
      .status(500)
      .json({ error: "something went wrong! Please try again later" });
  }
}

export default fetchUserProfile;
