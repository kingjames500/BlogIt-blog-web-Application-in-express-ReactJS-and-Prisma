import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardPreview.css";

function CardPreview({ user }) {
  const navigate = useNavigate();

  if (!user) return null;
  return (
    <div className="profile-review-card">
      <img
        src={user.avatar || "/path/to/default/avatar.jpg"}
        alt="User Avatar"
        className="profile-avatar"
      />
      <h2 className="profile-name">{user.name}</h2>
      <p className="profile-role">{user.occupation || "Role"}</p>
      <p className="profile-bio">{user.bio || "User bio goes here..."}</p>

      <button
        className="update-button"
        onClick={() => navigate("/profile/edit")}
      >
        Update
      </button>
    </div>
  );
}

export default CardPreview;
