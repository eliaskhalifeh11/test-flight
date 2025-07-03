import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const closeMenus = () => {
    setMenuOpen(false);
    setAdminOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <div className="navbar__logo">✈ SkyFly</div>

        <div className={`navbar__links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={closeMenus}>Home</Link>
          <Link to="/search" onClick={closeMenus}>Search Flights</Link>

          <div className="dropdown" onClick={() => setAdminOpen(!adminOpen)}>
            <span className="dropdown__toggle">Admin ▼</span>
            <div className={`dropdown__menu ${adminOpen ? "open" : ""}`}>
              <Link to="/admin" onClick={closeMenus}>Dashboard</Link>
              <Link to="/admin/flights" onClick={closeMenus}>Flights</Link>
              <Link to="/admin/bookings" onClick={closeMenus}>Bookings</Link>
            </div>
          </div>
        </div>
      </div>

      <button className="navbar__toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✕" : "☰"}
      </button>
    </nav>
  );
}

export default Navbar;
