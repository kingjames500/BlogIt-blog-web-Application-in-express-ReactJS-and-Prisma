import React from "react";
import { Link } from "react-router-dom";
import "./Errors.css";

function Errors({ error, linkPath = "/", linkText = "go to home" }) {
  return (
    <div className="error-container">
      {" "}
      <p>{error.message}</p>{" "}
      <Link to={linkPath} className="home-link">
        {" "}
        {linkText}{" "}
      </Link>{" "}
    </div>
  );
}

export default Errors;
