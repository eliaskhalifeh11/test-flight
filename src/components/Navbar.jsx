import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");


  const navigate = useNavigate();

  const closeMenus = () => {
    setMenuOpen(false);
    setAdminOpen(false);
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    const storedUsername = localStorage.getItem("username");

    setIsLoggedIn(loggedIn);
    setIsAdmin(role === "admin");
    setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <div className="navbar__logo">✈ SkyFly</div>

        <div className={`navbar__links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={closeMenus}>Home</Link>
          <Link to="/search" onClick={closeMenus}>Search Flights</Link>

        {isAdmin && (
            <div className="dropdown" onClick={() => setAdminOpen(!adminOpen)}>
              <span className="dropdown__toggle">Admin ▼</span>
              <div className={`dropdown__menu ${adminOpen ? "open" : ""}`}>
                <Link to="/admin" onClick={closeMenus}>Dashboard</Link>
                <Link to="/admin/flights" onClick={closeMenus}>Flights</Link>
                <Link to="/admin/bookings" onClick={closeMenus}>Bookings</Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="navbar__auth">
              {isLoggedIn ? (
          <div className="navbar__user-info">
            <span className="navbar__username">👤 {username}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button className="profile-icon-btn" onClick={() => navigate("/auth")}>
            <img
              src="https://img.icons8.com/ios-glyphs/30/ffffff/user--v1.png"
              alt="Profile"
              className="profile-icon"
            />
          </button>
        )}

      </div>

      <button className="navbar__toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✕" : "☰"}
      </button>
    </nav>
  );
}

export default Navbar;
