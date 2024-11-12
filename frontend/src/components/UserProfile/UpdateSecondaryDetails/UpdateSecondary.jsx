import React from "react";
import { useState, useEffect } from "react";
import imageUploadToCloudinary from "../../../utils/ImageUpload/imageUploadToCloudinary";
import { useMutation, useQuery } from "react-query";
import { Toaster, toast } from "sonner";
import apiUrl from "../../../utils/apiUrl";
import "../UserProfileCard/UserProfileCard.css";
import { useParams, useNavigate } from "react-router-dom";
import Title from "../../Title/Title";

function UpdateSecondary() {
  const [profileImageUrl, setAvatarPreview] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState("");
  const [occupation, setOccupation] = useState("");
  const [secondaryEmail, setSecondaryEmail] = useState("");

  const { profileId } = useParams();

  const redirect = useNavigate();

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageUrl = await imageUploadToCloudinary(file);
        console.log("cloudinary image url", imageUrl);
        setAvatarPreview(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  //  function for fetching user profile
  const { refetch } = useQuery({
    queryKey: ["userProfile", profileId],
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

    onSuccess: (data) => {
      setPhone(data.phoneNumber);
      setBio(data.bio);
      setStatus(data.status);
      setOccupation(data.occupation);
      setSecondaryEmail(data.secondaryEmail);
    },
    cacheTime: Infinity,
  });

  useEffect(() => {
    refetch();
  }, [profileId]);

  const { mutate, isLoading: isUpdating } = useMutation({
    mutationFn: async function (useSecondaryObj) {
      const response = await fetch(`${apiUrl}/user/profile/${profileId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(useSecondaryObj),
        credentials: "include",
      });

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },

    onSuccess: () => {
      toast.success("User Profile Update Successfully!", {
        duration: 3000,
      });

      setTimeout(() => {
        redirect("/user/profile");
      }, 1000);
    },

    onError: (error) => {
      toast.error(error.message, {
        duration: 2000,
      });
    },
  });

  function handleUpdateUserProfile(e) {
    e.preventDefault();

    const updatedUser = {
      profileImageUrl,
      bio,
      phoneNumber,
      secondaryEmail,
      status,
      occupation,
    };

    console.log("update button click", profileImageUrl);

    mutate(updatedUser);
  }

  return (
    <div className="profile-container">
      <Toaster position="top-center" richColors />
      <div className="profile-card">
        <Title
          mainTitle="Update Profile"
          subTitle="You can change you details on this page"
        />
        {profileImageUrl && (
          <img
            src={profileImageUrl}
            alt="Avatar Preview"
            className="avatar-preview"
          />
        )}

        <form className="profile-form">
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
            disabled={isUpdating}
            onClick={handleUpdateUserProfile}
          >
            {isUpdating ? "Updating profile..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateSecondary;
