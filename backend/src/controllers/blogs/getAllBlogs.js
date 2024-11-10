import { PrismaClient } from "../../imports/imports.js";

const client = new PrismaClient();

const GetAllBlogs = async (_req, res) => {
  try {
    const allBlogs = await client.blog.findMany({
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    res.status(200).json(allBlogs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "something went wrong! Please try again later" });
    return;
  }
};

export default GetAllBlogs;
