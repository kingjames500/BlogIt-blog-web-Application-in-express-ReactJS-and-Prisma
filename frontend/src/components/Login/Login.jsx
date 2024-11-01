import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import userDetailsStore from "../../Store/userDetailsStore";
import apiUrl from "../../utils/apiUrl";
import Title from "../Title/Title";
import "./Login.css";
import { Toaster, toast } from "sonner";
import userDetailsStore from "../../Store/userDetailsStore";

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
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const redirect = useNavigate();
  const setUser = userDetailsStore((state) => state.setUser);

  const { mutate, isLoading } = useMutation({
    mutationFn: async function (data) {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }
    },
  });

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
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
