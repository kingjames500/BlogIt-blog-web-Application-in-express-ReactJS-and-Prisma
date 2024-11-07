import React from "react";
import { Toaster, toast } from "sonner";
import Title from "../../Title/Title";
import { useState } from "react";
import { useMutation } from "react-query";
import { ProgressSpinner } from "primereact/progressspinner";

function UserProfileUpdatePassword() {
  const [previousPassword, setPreviousPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="login-form-container">
      <form className="login-form">
        <Toaster richColors position="top-center" expand={true} />
        <div className="login-title">
          <Title
            subTitle="forgot password? You can Reset it Here!"
            mainTitle="Reset Password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-group-label">
            previous password
          </label>
          <input
            type="password"
            className="form-group-input"
            placeholder="Enter your previous password"
            value={previousPassword}
            onChange={(e) => setPreviousPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-group-label">
            new password
          </label>
          <input
            type="password"
            className="form-group-input"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-group-label">
            confirm new password
          </label>
          <input
            type="password"
            className="form-group-input"
            placeholder="confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="login-btn">
          {/* {isLoading ? (
                      <div className="loader-container">
                          <ProgressSpinner
                              style={{ width: "50px", height: "3rem" }}
                              strokeWidth="10"
                              fill="var(--surface-ground)"
                              animationDuration=".4s"
                          />
                      </div>
                  ) : (
                      "Login"
                  )} */}
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default UserProfileUpdatePassword;
