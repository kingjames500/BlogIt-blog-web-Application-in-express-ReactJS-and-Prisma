import {
  Router,
  updateUserInformation,
  userPasswordUpdate,
  createUserProfile,
  updateUserProfileData,
  fetchUserProfile,
  updateUserProfile,
  userProfileValidation,
} from "../imports/imports.js";
import verifyAuthToken from "../middleware/authToken/verifyAuthToken.js";

const router = Router();
// updating user details such as username and password
router.put("/user/profile", verifyAuthToken, updateUserInformation);

//route for updating user password
router.patch("/user/password/update", verifyAuthToken, userPasswordUpdate);

// route for creating a user profile additional data if profile does not exist
router.post("/user/create/profile", verifyAuthToken, createUserProfile);

// route for updating profile information such as avatar and secondary email

router.patch("/user/update/profile", verifyAuthToken, updateUserProfileData);

router.get("/user/profile", verifyAuthToken, fetchUserProfile);

router.put("/user/profile/:profileId", verifyAuthToken, updateUserProfile);

export default router;
