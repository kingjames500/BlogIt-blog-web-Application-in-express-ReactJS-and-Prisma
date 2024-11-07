import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";
import headerLogo from "../../assets/images/header-image.png";
import userDetailsStore from "../../Store/userDetailsStore";
import { Toaster, toast } from "sonner";

function NavbarHeader() {
  const user = userDetailsStore((state) => state.user);
  const logout = userDetailsStore((state) => state.logout);

  const redirect = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    toast.success("Logged out successfully!", {
      duration: 3000,
    });
    setTimeout(() => {
      redirect("/");
    }, 100);
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <img src={headerLogo} alt="logo" className="logo" />
        <span className="site-name">BlogIt</span>
      </div>
      <Toaster richColors position="top-centre" expand={true} />
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
                  blogs
                </Link>
              </li>
              <li className="navigation-list-items">
                <Link className="links" to="/create-blog">
                  Create Blog
                </Link>
              </li>
              <li className="navigation-list-items">
                <Link className="links" to="/blogs-feed">
                  feed
                </Link>
              </li>
              <li className="navigation-list-items">
                <Link className="links" to="/user/profile">
                  profile
                </Link>
              </li>
              <li className="navigation-list-items">
                <Link to="/" className="links" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li className="navigation-list-items">
              <Link className="links" to="/login">
                login
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
