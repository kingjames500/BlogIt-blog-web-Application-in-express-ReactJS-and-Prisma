import React from "react";
import "./Header.css";
import headerLogo from "../../assets/images/header-image.png";
import userDetailsStore from "../../Store/userDetailsStore.js";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";

function NavbarHeader() {
  const logout = userDetailsStore((state) => state.logout);
  const user = userDetailsStore((state) => state.user);

  function isLogout() {
    logout();
    toast.success("Logged out successfully", {
      duration: 3000,
    });
  }

  return (
    <div className="navbar">
      <Toaster richColors position="top-center" />
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

          {user ? (
            <>
              <li className="navigation-list-items">
                <Link className="links" to="/blogs">
                  Blogs
                </Link>
              </li>
              <li className="navigation-list-items">
                <Link className="links" to="/create-blog">
                  Create Blog
                </Link>
              </li>
              <li className="navigation-list-items">
                <Link className="links" to="/blogs-feed">
                  Feed
                </Link>
              </li>
              <li className="navigation-list-items">
                <Link className="links" to="/user/profile">
                  {`${user.firstName}  ${user.lastName}`}
                </Link>
              </li>
              <li className="navigation-list-items">
                <Link to="/" className="links" onClick={isLogout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li className="navigation-list-items">
              <Link className="links" to="/login">
                Login
              </Link>
            </li>
          )}
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
