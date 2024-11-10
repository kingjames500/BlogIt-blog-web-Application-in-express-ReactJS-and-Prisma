import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardPreview.css";

function CardProfile({ user }) {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="profile-review-card">
      <img
        src={user.profileImageUrl}
        alt="User Avatar"
        className="profile-avatar"
      />
      <div className="profile-details">
        <h2 className="profile-name">{user.user.username}</h2>
        <p className="profile-role">{user.occupation || "Role"}</p>
        <p className="profile-bio">{user.bio || "User bio goes here..."}</p>
        <p className="profile-phone">{user.phoneNumber || "Phone number"}</p>
        <p className="profile-status">{user.status || "Status"}</p>
        <p className="profile-email">{user.secondaryEmail}</p>
        <button
          className="update-button"
          onClick={() => navigate(`/profile/edit/${user.id}`)}
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default CardProfile;
