import React from "react";
import "./Signup.css";
import Title from "../Title/Title";

function SignupForm() {
  return (
    <div className="signup-form-container">
      <form className="signup-form">
        <div className="user-details">
          <div className="form-group">
            <label htmlFor="first name" className="form-group-label">
              {" "}
              First Name
            </label>
            <input
              type="text"
              className="form-group-input"
              placeholder="Enter your firstname"
            />
          </div>
          <div className="form-group">
            <label htmlFor="last name" className="form-group-label">
              {" "}
              Last Name
            </label>
            <input
              type="text"
              className="form-group-input"
              placeholder="Enter your lastname"
            />
          </div>
        </div>
        <div className="user-details">
          <div className="form-group">
            <label htmlFor="username" className="form-group-label">
              {" "}
              username
            </label>
            <input
              type="text"
              className="form-group-input"
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-group-label">
              {" "}
              your email
            </label>
            <input
              type="email"
              className="form-group-input"
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div className="user-details">
          <div className="form-group">
            <label htmlFor="password" className="form-group-label">
              {" "}
              password
            </label>
            <input
              type="password"
              className="form-group-input"
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm password" className="form-group-label">
              {" "}
              confirm password
            </label>
            <input
              type="password"
              className="form-group-input"
              placeholder="confirm your password"
            />
          </div>
        </div>
        <button className="track-enrol-btn">submit</button>
      </form>
    </div>
  );
}

function Signup() {
  return (
    <div className="signup-section">
      <Title
        mainTitle="Sign up"
        subTitle="join the community of talented writers"
      />
      <SignupForm />
    </div>
  );
}

export default Signup;
