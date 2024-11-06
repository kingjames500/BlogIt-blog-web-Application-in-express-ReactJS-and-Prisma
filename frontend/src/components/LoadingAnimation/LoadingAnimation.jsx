import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import "./Loading.css";

function LoadingAnimation() {
  return (
    <div className="loading-container">
      <ProgressSpinner />
    </div>
  );
}

export default LoadingAnimation;
