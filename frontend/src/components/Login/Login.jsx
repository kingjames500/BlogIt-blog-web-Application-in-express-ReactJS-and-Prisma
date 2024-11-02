import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import userDetailsStore from "../../Store/userDetailsStore";
import apiUrl from "../../utils/apiUrl";
import Title from "../Title/Title";
import "./Login.css";
import { ThreeDots } from "react-loader-spinner";
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
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const redirect = useNavigate();
  const setUser = userDetailsStore((state) => state.setUser);

  const { mutate, isLoading } = useMutation({
    mutationFn: async function (userDetails) {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },

    onSuccess: (data) => {
      setUser(data);
      toast.success("Authenticted succesfully!", {
        duration: 3000,
      });

      setTimeout(() => {
        redirect("/blogs");
      }, 100);
    },

    onError: (error) => {
      toast.error(error.message, {
        duration: 3000,
      });
    },
  });

  function handleLogin(e) {
    e.preventDefault;

    mutate({ emailOrUsername, password });
  }

  return (
    <div className="login-form-container">
      <form className="login-form">
        <Toaster richColors position="top-center" expand={true} />
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
        <button
          className="login-btn"
          disabled={isLoading}
          onClick={handleLogin}
        >
          {isLoading ? (
            <div className="loader-container">
              <ThreeDots color="#6933ff" height={16} />
            </div>
          ) : (
            "Login"
          )}
        </button>
        <RegisterLink />
      </form>
      cd client
    </div>
  );
}

function Login() {
  return <LoginForm />;
}

export default Login;
