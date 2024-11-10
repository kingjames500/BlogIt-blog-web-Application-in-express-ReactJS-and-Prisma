import { PrismaClient } from "../../imports/imports.js";

const client = new PrismaClient();

const deleteBlogByAuthorId = async (req, res) => {
  try {
    const authorId = req.userId;
    const { blogId } = req.params;

    console.log("blog id ", blogId);

    const deletedBlog = await client.blog.delete({
      where: {
        id: blogId,
        author: authorId,
      },
    });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "something went wrong! Please try again later" });
    return;
  }
};

export default deleteBlogByAuthorId;
