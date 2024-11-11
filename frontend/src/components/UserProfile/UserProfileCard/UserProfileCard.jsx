import React, { useState, useEffect } from "react";
import "./UserProfileCard.css";
import imageUploadToCloudinary from "../../../utils/ImageUpload/imageUploadToCloudinary";
import { useMutation, useQuery } from "react-query";
import apiUrl from "../../../utils/apiUrl";
import { ProgressSpinner } from "primereact/progressspinner";
import Errors from "../../Errors/Errors";
import { Toaster, toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";
import CardProfile from "./CardProfile";

function UserProfileCard() {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [phoneNumber, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState("");
  const [occupation, setOccupation] = useState("");
  const [secondaryEmail, setSecondaryEmail] = useState("");
  const redirect = useNavigate();

  const { userId } = useParams();

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageUrl = await imageUploadToCloudinary(file);
        console.log(imageUrl);
        setAvatarPreview(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userProfile = {
      profileImageUrl: avatarPreview,
      phoneNumber,
      bio,
      status,
      occupation,
      secondaryEmail,
    };

    mutate(userProfile);
  };

  //  function for fetching user profile
  const { data: profile, isLoading } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/user/profile`, {
        credentials: "include",
      });

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },
  });

  // mutate function for creating user profile
  const {
    mutate,
    isLoading: isSubmitting,
    isError,
    error,
  } = useMutation({
    mutationFn: async (useProfileObj) => {
      const response = await fetch(`${apiUrl}/user/create/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(useProfileObj),
        credentials: "include",
      });
      console.log(response);

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },

    onSuccess: () => {
      toast.success("Profile created successfully", {
        duration: 2500,
      });

      setTimeout(() => {
        redirect(`/user/profile`);
      }, 2500);
    },

    onError: (error) => {
      toast.error(error.message, {
        duration: 5000,
      });
    },
  });

  if (isLoading) {
    return (
      <div className="loading-container">
        <ProgressSpinner />
      </div>
    );
  }
  if (isError) {
    return (
      <Errors
        error={error.message}
        linkPath="/user/profile"
        linkText="there was a problem while creating your profile"
      />
    );
  }

  if (profile) {
    return <CardProfile user={profile} />;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">User Profile</h2>

        {avatarPreview && (
          <img
            src={avatarPreview}
            alt="Avatar Preview"
            className="avatar-preview"
          />
        )}

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-field">
            <label htmlFor="avatar">Upload Avatar</label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="2"
            />
          </div>

          <div className="form-field">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="occupation">Occupation</label>
            <input
              type="text"
              id="occupation"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="secondaryEmail">Secondary Email</label>
            <input
              type="email"
              id="secondaryEmail"
              value={secondaryEmail}
              onChange={(e) => setSecondaryEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="save-button"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Creating profile..." : "Create Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfileCard;
