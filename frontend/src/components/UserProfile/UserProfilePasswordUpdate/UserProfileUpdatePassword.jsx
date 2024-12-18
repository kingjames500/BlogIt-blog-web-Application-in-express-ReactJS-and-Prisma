import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import Title from "../../Title/Title";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import apiUrl from "../../../utils/apiUrl";
import userDetailsStore from "../../../Store/userDetailsStore";
import "./userPasswordUpdate.css";

function UserProfileUpdatePassword() {
  const redirect = useNavigate();
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const logout = userDetailsStore((state) => state.logout);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (password) => {
      const response = await fetch(`${apiUrl}/user/password/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(password),
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },

    onSuccess: (data) => {
      toast.success(data.message, {
        duration: 2000,
      });

      setTimeout(() => {
        logout();
        redirect("/login");
      }, 1000);
    },

    onError: (error) => {
      toast.error(error.message, {
        duration: 2000,
      });
    },
  });

  function handlePasswordUpdate(e) {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error("passwords do not match", {
        duration: 2000,
      });
      return;
    }

    mutate({ previousPassword, newPassword });
  }

  return (
    <div className="password-form-container">
      <form className="password-form">
        <Toaster richColors position="top-center" expand={true} />
        <div className="password-title">
          <Title
            subTitle="forgot password? You can Reset it Here!"
            mainTitle="Reset Password"
          />
        </div>
        <div className="password-form-group">
          <label htmlFor="password" className="password-form-group-label">
            previous password
          </label>
          <input
            type="password"
            className="password-form-group-input"
            placeholder="Enter your previous password"
            value={previousPassword}
            onChange={(e) => setPreviousPassword(e.target.value)}
          />
        </div>
        <div className="password-form-group">
          <label htmlFor="password" className="password-form-group-label">
            new password
          </label>
          <input
            type="password"
            className="password-form-group-input"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="password-form-group">
          <label htmlFor="password" className="password-form-group-label">
            confirm new password
          </label>
          <input
            type="password"
            className="password-form-group-input"
            placeholder="confirm your new password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <button
          className="password-btn"
          disabled={isLoading}
          onClick={handlePasswordUpdate}
        >
          {isLoading ? (
            <div className="password-loader-container">
              <ProgressSpinner
                style={{ width: "50px", height: "3rem" }}
                strokeWidth="10"
                fill="var(--surface-ground)"
                animationDuration=".4s"
              />
            </div>
          ) : (
            "change password"
          )}
        </button>
      </form>
    </div>
  );
}

export default UserProfileUpdatePassword;
