import { PrismaClient } from "../../imports/imports.js";

const client = new PrismaClient();

const updateBlog = async (req, res) => {
  try {
    const authorId = req.userId;
    const { blogId } = req.params;
    const { title, excerpt, content, imageUrl } = req.body;

    const blogToUpdate = await client.blog.update({
      where: {
        id: blogId,
        author: authorId,
      },
      data: {
        title,
        excerpt,
        content,
        imageUrl,
      },
    });

    res
      .status(200)
      .json({ message: "Blog updated successfully!", blog: blogToUpdate });
  } catch (error) {
    res
      .status(500)
      .json({ message: "something went wrong! Please try again later" });
    return;
  }
};

export default updateBlog;
