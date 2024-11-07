import PersonalInfoUpdate from "./PersonalProfile/PersonalInfoUpdate";
import UserProfileUpdatePassword from "./UserProfilePasswordUpdate/UserProfileUpdatePassword";
import UserProfileCard from "./UserProfileCard/UserProfileCard";
import "./Profile.css";

function ProfileDisplay() {
  return (
    <div className="profile-section-display">
      {/* <PersonalInfoUpdate /> */}
      {/* <UserProfileUpdatePassword /> */}
      <UserProfileCard />
    </div>
  );
}

export default ProfileDisplay;
