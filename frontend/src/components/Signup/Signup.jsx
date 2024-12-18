import { useState } from "react";
import "./Signup.css";
import Title from "../Title/Title";
import { useMutation } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import apiUrl from "../../utils/apiUrl";
import { Toaster, toast } from "sonner";
import { ProgressSpinner } from "primereact/progressspinner";

function LoginLink() {
  return (
    <div className="signup-link">
      <p>Already have an account?</p>
      <Link to="/login" className="signup-link-btn">
        Login
      </Link>
    </div>
  );
}

function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: async function (newUser) {
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("User registered successfully", {
        duration: 3000,
      });
      setTimeout(() => {
        redirect("/login");
      }, 2050);
    },

    onError: (error) => {
      toast.error(error.message, {
        duration: 4000,
      });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("passwords do not match", {
        duration: 3000,
      });
      return;
    }
    const register = {
      firstName,
      lastName,
      username,
      email,
      password,
    };
    mutate(register);
  }
  return (
    <div className="signup-form-container">
      <form className="signup-form">
        <Toaster position="top-centre" richColors expand />
        <div className="signup-title">
          <Title subTitle="register to BlogIt" />
        </div>
        <div className="user-details">
          <div className="form-group">
            <label htmlFor="first name" className="form-group-label">
              First Name
            </label>
            <input
              type="text"
              className="form-group-input"
              placeholder="Enter your firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="user-details">
          <div className="form-group">
            <label htmlFor="username" className="form-group-label">
              username
            </label>
            <input
              type="text"
              className="form-group-input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-group-label">
              your email
            </label>
            <input
              type="email"
              className="form-group-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="user-details">
          <div className="form-group">
            <label htmlFor="password" className="form-group-label">
              password
            </label>
            <input
              type="password"
              className="form-group-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm password" className="form-group-label">
              confirm password
            </label>
            <input
              type="password"
              className="form-group-input"
              placeholder="confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          className="signup-btn"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="loader-container">
              <ProgressSpinner
                style={{ width: "50px", height: "3rem" }}
                strokeWidth="10"
                fill="var(--surface-ground)"
                animationDuration=".4s"
              />
            </div>
          ) : (
            "Register"
          )}
        </button>
        <LoginLink />
      </form>
    </div>
  );
}

function Signup() {
  return (
    <div className="signup-section">
      <SignupForm />
    </div>
  );
}

export default Signup;
