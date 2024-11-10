import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./Routers/authRouter.js";
import blogRouter from "./Routers/blogRouter.js";
import userRouter from "./Routers/userRouter.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

//route for registering a user
app.use("/auth", authRouter);

// route for all the blogs requests
app.use("", blogRouter);

//route for user information
app.use("", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
