import { useState } from "react";
import "./Signup.css";
import Title from "../Title/Title";
import { useMutation } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import apiUrl from "../../utils/apiUrl";
import { Toaster, toast } from "sonner";

function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const redirect = useNavigate();

  const { mutate, isLoading, isError, error } = useMutation({
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
      console.log(response);
    },
    onSuccess: () => {
      toast.success("registration successful", {
        duration: 5000,
      });
      redirect("/login");
    },

    onError: (error) => {
      toast.error(error.message, {
        duration: 5000,
      });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setFormError("passwords do not match");
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
      <Toaster richColors position="top-center" expand={true} />
      <form className="signup-form">
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
        <button className="track-enrol-btn" onClick={handleSubmit}>
          submit
        </button>
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
