import React from "react";
import "./Landing.css";
import Title from "../Title/Title";
import { Link } from "react-router-dom";

function CallToAction() {
  return (
    <div className="cta-container">
      {" "}
      <Link to="/create-blog" className="cta-btn primary">
        Start Writing
      </Link>
      <Link to="/blogs" className="cta-btn secondary">
        Explore Stories
      </Link>
    </div>
  );
}

function Hero() {
  return (
    <div className="hero">
      <div className="hero-text">
        <h1 className="hero-heading">welcome to blogIt</h1>
        <p className="hero-paragraph">
          Express yourself, connect with like-minded individuals, and let your
          voice be heard on our dynamic platform.
        </p>
      </div>
      <CallToAction />
    </div>
  );
}

function Landing() {
  return (
    <div>
      <div className="page-title">
        <Title
          mainTitle="Welcome to BlogIt"
          subTitle="A platform to share your thoughts and ideas with the world"
        />
      </div>
      <Hero />
    </div>
  );
}

export default Landing;
