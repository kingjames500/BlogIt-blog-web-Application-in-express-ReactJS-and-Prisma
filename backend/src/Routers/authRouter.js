import {
  Router,
  registerUser,
  loginUser,
  logoutUser,
  validateUserInputInformation,
} from "../imports/imports.js";

import { userValidator } from "../middleware/utils/userValidator.js";

const router = Router();

router.post("/register", validateUserInputInformation, registerUser);
router.post("/login", userValidator, loginUser);
router.post("/logout", logoutUser);

export default router;
