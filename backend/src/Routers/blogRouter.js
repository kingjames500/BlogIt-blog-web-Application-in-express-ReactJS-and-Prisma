import {
  Router,
  CreateBlog,
  createBlogValidation,
  GetAllBlogs,
  fetchAllBlogsFromASingleAuthor,
  fetchASingleBlog,
  deleteBlogByAuthorId,
  updateBlog,
} from "../imports/imports.js";

import verifyAuthToken from "../middleware/authToken/verifyAuthToken.js";

const router = Router();

router.post("/create-blog", verifyAuthToken, createBlogValidation, CreateBlog);
router.get("/blogs", GetAllBlogs);
router.get("/blogs/author", verifyAuthToken, fetchAllBlogsFromASingleAuthor);
router.get("/blog/:id", verifyAuthToken, fetchASingleBlog);
router.delete("/blog/author/:blogId", verifyAuthToken, deleteBlogByAuthorId);
router.put(
  "/blog/update/:blogId",
  verifyAuthToken,
  createBlogValidation,
  updateBlog,
);
export default router;
