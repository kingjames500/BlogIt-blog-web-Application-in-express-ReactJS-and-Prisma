import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import Title from "../Title/Title";
import "./Login.css";
import { Toaster, toast } from "sonner";

function RegisterLink() {
  return (
    <div className="register-link">
      <p>Don't have an account?</p>
      <Link to="/signup" className="register-link-btn">
        Register
      </Link>
    </div>
  );
}

function LoginForm() {
  return (
    <div className="login-form-container">
      <Toaster richColors position="top-center" expand={true} />
      <form className="login-form">
        <div className="login-title">
          <Title subTitle="login to BlogIt" />
        </div>
        <div className="form-group">
          <label htmlFor="email-username" className="form-group-label">
            {" "}
            email or username
          </label>
          <input
            type="text"
            className="form-group-input"
            placeholder="Enter your username or email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-group-label">
            password
          </label>
          <input
            type="password"
            className="form-group-input"
            placeholder="Enter your password"
          />
        </div>
        <button className="login-btn">login</button>
        <RegisterLink />
      </form>
    </div>
  );
}

function Login() {
  return <LoginForm />;
}

export default Login;
