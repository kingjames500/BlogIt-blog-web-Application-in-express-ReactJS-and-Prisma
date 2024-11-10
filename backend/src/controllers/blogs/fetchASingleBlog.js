import { PrismaClient } from "../../imports/imports.js";

const client = new PrismaClient();

const fetchASingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await client.blog.findUnique({
      where: {
        id: id,
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!blog) {
      res.status(404).json({ message: `blog with id ${id} was not found` });
      return;
    }
    res.status(200).json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "something went wrong! Please try again later" });
    return;
  }
};

export default fetchASingleBlog;
