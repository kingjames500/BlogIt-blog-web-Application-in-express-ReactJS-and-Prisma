export const userValidator = (req, res, next) => {
  const emailOrUsername = req.body.emailOrUsername;
  const password = req.body.password;

  if (!emailOrUsername) {
    return res.status(400).json({ message: "Email or username is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  next();
};
