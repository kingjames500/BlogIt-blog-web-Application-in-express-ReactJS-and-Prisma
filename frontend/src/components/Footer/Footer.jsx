// Footer.js
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} kingjames👑. All rights reserved.
        </p>

        <div className="footer-links">
          <a href="mailto:your.email@example.com" className="footer-link">
            Contact
          </a>
          <a
            href="https://github.com/your-github-username"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
