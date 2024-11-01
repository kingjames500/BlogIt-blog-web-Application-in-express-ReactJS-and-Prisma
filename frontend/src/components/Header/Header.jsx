import React from "react";
import "./Header.css";
import headerLogo from "../../assets/images/header-image.png";

import { Link } from "react-router-dom";

function NavbarHeader() {
  return (
    <div className="navbar">
      <div className="logo-container">
        <img src={headerLogo} alt="logo" className="logo" />
        <span className="site-name">BlogIt</span>
      </div>
      <nav>
        <ol className="navigation-list">
          <li className="navigation-list-items">
            <Link className="links" to="/">
              Home
            </Link>
          </li>
          <li className="navigation-list-items">
            <Link className="links" to="/signup">
              sign up
            </Link>
          </li>
          <li className="navigation-list-items">
            <Link className="links" to="/tracks">
              tracks
            </Link>
          </li>
          <li className="navigation-list-items">
            <Link className="links" to="/club-events">
              events
            </Link>
          </li>
        </ol>
      </nav>
    </div>
  );
}
function Header() {
  return (
    <header>
      <NavbarHeader />
    </header>
  );
}

export default Header;
