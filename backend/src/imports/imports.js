import { PrismaClient } from "@prisma/client";
import { Router } from "express";

//file imports
import registerUser from "../controllers/Auth/registerUser.js";
import loginUser from "../controllers/Auth/loginUser.js";
import logoutUser from "../controllers/Auth/logoutUser.js";
import validateUserInputInformation from "../middleware/validateUserInputInformation.js";
import GetAllBlogs from "../controllers/blogs/getAllBlogs.js";
import createBlogValidation from "../middleware/createBlogValidation.js";
import CreateBlog from "../controllers/blogs/createBlog.js";
import fetchAllBlogsFromASingleAuthor from "../controllers/blogs/fetchAllBlogsFromASingleAuthor.js";
import fetchASingleBlog from "../controllers/blogs/fetchASingleBlog.js";
import deleteBlogByAuthorId from "../controllers/blogs/deleteBlogByAuthorId.js";
import updateBlog from "../controllers/blogs/updateBlog.js";
import userPasswordUpdate from "../controllers/user/userPasswordUpdate.js";
import createUserProfile from "../controllers/user/createUserProfile.js";
import fetchUserProfile from "../controllers/user/fetchUserProfile.js";
import updateUserProfile from "../controllers/user/updateUserProfile.js";
import {
  updateUserProfileData,
  updateUserInformation,
} from "../controllers/user/updateUserInformation.js";

export {
  PrismaClient,
  Router,
  registerUser,
  loginUser,
  logoutUser,
  validateUserInputInformation,
  createBlogValidation,
  CreateBlog,
  fetchAllBlogsFromASingleAuthor,
  GetAllBlogs,
  fetchASingleBlog,
  deleteBlogByAuthorId,
  updateBlog,
  userPasswordUpdate,
  createUserProfile,
  updateUserInformation,
  updateUserProfileData,
  fetchUserProfile,
  updateUserProfile,
};
