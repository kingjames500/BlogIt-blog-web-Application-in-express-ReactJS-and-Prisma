import PersonalInfoUpdate from "./PersonalProfile/PersonalInfoUpdate";
import UserProfileUpdatePassword from "./UserProfilePasswordUpdate/UserProfileUpdatePassword";
import "./Profile.css";

function ProfileDisplay() {
  return (
    <div className="profile-section-display">
      {/* <PersonalInfoUpdate /> */}
      <UserProfileUpdatePassword />
    </div>
  );
}

export default ProfileDisplay;
