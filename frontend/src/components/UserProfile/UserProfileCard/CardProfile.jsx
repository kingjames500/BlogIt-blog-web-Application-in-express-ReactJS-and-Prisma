import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBriefcase,
  faInfoCircle,
  faPhone,
  faEnvelope,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
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
        <h2 className="profile-name">
          <FontAwesomeIcon icon={faUser} className="icon" /> {user.user.username}
        </h2>
        <p className="profile-role">
          <FontAwesomeIcon icon={faBriefcase} className="icon" /> {user.occupation || "Role"}
        </p>
        <p className="profile-bio">
          <FontAwesomeIcon icon={faInfoCircle} className="icon" /> {user.bio || "User bio goes here..."}
        </p>
        <p className="profile-phone">
          <FontAwesomeIcon icon={faPhone} className="icon" /> {user.phoneNumber || "Phone number"}
        </p>
        <p className="profile-status">
          <FontAwesomeIcon icon={faInfoCircle} className="icon" /> {user.status || "Status"}
        </p>
        <p className="profile-email">
          <FontAwesomeIcon icon={faEnvelope} className="icon" /> {user.secondaryEmail}
        </p>
        <button
          className="update-button"
          onClick={() => navigate(`/profile/edit/${user.id}`)}
        >
          <FontAwesomeIcon icon={faEdit} /> Update
        </button>
      </div>
    </div>
  );
}

export default CardProfile;
