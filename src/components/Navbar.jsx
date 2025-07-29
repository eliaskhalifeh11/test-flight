import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/auth");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">FlightBooking</Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/search">Search Flights</Link>

        {user?.role === "admin" && (
          <div className="dropdown">
            <span className="dropdown__toggle">Admin ▾</span>
            <div className="dropdown__menu">
              <Link to="/admin">Dashboard</Link>
              <Link to="/admin/flights">Manage Flights</Link>
              <Link to="/admin/bookings">View Bookings</Link>
            </div>
          </div>
        )}

        {!user ? (
          <Link to="/auth">Login / Signup</Link>
        ) : (
          <>
            <span className="welcome-msg">Welcome, {user.username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
