import React from "react";
import { Toaster, toast } from "sonner";
import Title from "@/components/Title/Title";
import { useEffect, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import apiUrl from "../../../utils/apiUrl";
import { useMutation } from "react-query";
import userDetailsStore from "../../../Store/userDetailsStore";

function PersonalInfoUpdate() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const user = userDetailsStore((state) => state.user);
  const setUser = userDetailsStore((state) => state.setUser);

  useEffect(() => {
    if (!user) return;
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setUsername(user.username);
    setEmail(user.email);
  }, [user]);

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async (updatedUserObj) => {
      const response = await fetch(`${apiUrl}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserObj),
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
      setUser(data);
      toast.success("Profile updated successfully", {
        duration: 4000,
      });
    },
  });

  function handleUserSubmit(e) {
    e.preventDefault();

    const updatedUserObj = {
      firstName,
      lastName,
      username,
      email,
    };
    console.log(updatedUserObj);
    mutate(updatedUserObj);
  }

  return (
    <div className="login-form-container">
      <form className="login-form">
        <Toaster richColors position="top-center" expand={true} />
        <div className="login-title">
          <Title mainTitle="update personal info" />
        </div>
        <div className="form-group">
          <label htmlFor="firstName" className="form-group-label">
            {" "}
            first name
          </label>
          <input
            type="text"
            className="form-group-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last-name" className="form-group-label">
            {" "}
            last name
          </label>
          <input
            type="text"
            className="form-group-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username" className="form-group-label">
            {" "}
            username
          </label>
          <input
            type="text"
            className="form-group-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-group-label">
            {" "}
            email
          </label>
          <input
            type="email"
            className="form-group-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleUserSubmit} className="login-btn">
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
            "update profile"
          )}
        </button>
      </form>
    </div>
  );
}

export default PersonalInfoUpdate;
