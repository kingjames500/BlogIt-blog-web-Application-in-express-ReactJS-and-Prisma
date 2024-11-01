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
                <Link className="links" to="/club-events">
                  Events
                </Link>
              </li>
              <li className="navigation-list-items">
                <Link className="links" to="/profile">
                  Profile
                </Link>
              </li>

              <li className="navigation-list-items">
                <Link className="links">{user.username}</Link>
              </li>

              <li className="navigation-list-items">
                <Link href="/" className="links" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="navigation-list-items">
                <Link className="links" to="/signup">
                  Signup
                </Link>
              </li>
              <li className="navigation-list-items">
                <Link className="links" to="/login">
                  Login
                </Link>
              </li>
            </>
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
