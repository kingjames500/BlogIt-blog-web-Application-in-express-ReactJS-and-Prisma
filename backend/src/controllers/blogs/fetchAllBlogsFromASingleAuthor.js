import { PrismaClient } from "../../imports/imports.js";

const client = new PrismaClient();
const fetchAllBlogsFromASingleAuthor = async (req, res) => {
  try {
    const authorId = req.userId;
    const authorBlogs = await client.blog.findMany({
      where: {
        author: authorId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    // if (authorBlogs.length === 0) {
    //   res.status(404).send({ message: "No blogs found for this author" });
    //   return;
    // }
    res
      .status(200)
      .send({ message: "All blogs fetched successfully", data: authorBlogs });
  } catch (error) {
    res
      .status(500)
      .send({ message: "something went wrong! Please try again later" });
  }
};

export default fetchAllBlogsFromASingleAuthor;
