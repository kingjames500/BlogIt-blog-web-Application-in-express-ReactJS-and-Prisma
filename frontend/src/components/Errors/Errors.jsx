import React from "react";
import { Link } from "react-router-dom";
import "./Errors.css";

function Errors({ error }) {
  return (
    <div className="error-container">
      <p>{error.message}</p>
      <Link to="/" className="home-link">
        Go to Home
      </Link>
    </div>
  );
}

export default Errors;
