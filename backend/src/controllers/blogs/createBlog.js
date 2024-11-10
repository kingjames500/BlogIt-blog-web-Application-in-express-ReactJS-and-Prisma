import { PrismaClient } from "../../imports/imports.js";

const client = new PrismaClient();

const CreateBlog = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, imageUrl, excerpt, content } = req.body;
    const newBlog = await client.blog.create({
      data: {
        title,
        excerpt,
        content,
        imageUrl,
        author: userId,
      },
    });
    res
      .status(201)
      .json({ message: "Blog created successfully", data: newBlog });
  } catch (error) {
    res
      .status(500)
      .json({ message: "something went wrong! Please try again later" });
    return;
  }
};

export default CreateBlog;
