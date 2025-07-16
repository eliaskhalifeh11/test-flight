import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/home.css";

import Easy from "../assets/images/easy.png";
import bestP from "../assets/images/bestprice.png";
import Global from "../assets/images/global.jpg";
import Beirut from "../assets/images/beirut.webp";
import Paris from "../assets/images/paris.jpg";
import Turkey from "../assets/images/turkey.jpg";
import NewYork from "../assets/images/NewYork.webp";
import Tokyo from "../assets/images/tokyo.jpeg";
import Rome from "../assets/images/rome.jpg";
import Dubai from "../assets/images/dubai.webp";
import Bangkok from "../assets/images/bangkok.jpg";

// Destination card
function DestinationCard({ city, imageUrl, link }) {
  return (
    <Link to={link} className="destination-card">
      <img src={imageUrl} alt={city} className="destination-image" />
      <div className="destination-name-overlay">{city}</div>
    </Link>
  );
}

// Scroll animation wrapper
function ScrollAnimationWrapper({ children }) {
  const [visible, setVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      }); 
    });

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`animate-on-scroll ${visible ? "visible" : ""}`} ref={domRef}>
      {children}
    </div>
  );
}

// Login Modal
function LoginModal({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const role = username.startsWith("admin") ? "admin" : "user";
    localStorage.setItem("role", role);
    onClose();
    window.location.reload();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
}

// Home Page
function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="home-layout">
      <main className="page-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1 className="hero-title">Welcome to SkyFly</h1>
            <p className="hero-subtitle">Book your next flight with ease and confidence</p>
            <Link to="/search">
              <button className="hero-button">Search Flights</button>
            </Link>
          </div>
        </section>

        {/* Why Choose Us */}
        <ScrollAnimationWrapper>
          <section className="features-section">
            <h2 className="section-title">Why Choose SkyFly?</h2>
            <div className="features-grid">
             <div className="feature-card">
                <img src={Easy} alt="Easy Booking" className="feature-icon" />
                <div className="feature-overlay">
                  <strong>Easy Booking</strong>
                  <p>Quickly find and book flights with a few clicks.</p>
                </div>
              </div>
              <div className="feature-card">
                <img src={bestP} alt="Best Prices" className="feature-icon" />
                 <div className="feature-overlay">
                 <strong>Best Prices</strong>
                 <p>Competitive pricing with no hidden fees.</p>
                 </div>
              </div>
              <div className="feature-card">
                <img src={Global} alt="Global Destinations" className="feature-icon" />
                 <div className="feature-overlay">
                   <strong>Global Destinations</strong>
                   <p>Fly to thousands of cities worldwide.</p>
                   </div>
              </div>
            </div>
          </section>
        </ScrollAnimationWrapper>

        {/* Popular Destinations */}
        <ScrollAnimationWrapper>
          <section className="destinations-section">
            <h2 className="section-title">Popular Destinations</h2>
            <div className="destinations-grid">
              <DestinationCard city="Beirut" imageUrl={Beirut} link="/search?city=Beirut" />
              <DestinationCard city="Dubai" imageUrl={Dubai} link="/search?city=Dubai" />
              <DestinationCard city="Paris" imageUrl={Paris} link="/search?city=Paris"/>
              <DestinationCard city="Istanbul" imageUrl={Turkey} link="/search?city=Turkey" />
              <DestinationCard city="New York" imageUrl={NewYork} link="/search?city=NewYork" />
              <DestinationCard city="Tokyo" imageUrl={Tokyo} link="/search?city=Tokyo" />
              <DestinationCard city="Rome" imageUrl={Rome} link="/search?city=Rome" />
              <DestinationCard city="Bangkok" imageUrl={Bangkok} link="/search?city=Bangkok" />
            </div>
          </section>
        </ScrollAnimationWrapper>

        {/* Testimonials */}
        <section className="testimonials-section">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonials-grid">
            <Testimonial name="Maya" feedback="SkyFly made my travel so easy and affordable!" />
            <Testimonial name="Omar" feedback="Best flight booking experience ever." />
            <Testimonial name="Leila" feedback="I recommend SkyFly to all my friends." />
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <h2>Ready to fly?</h2>
          <p>Book your dream destination today!</p>
          <Link to="/search">
            <button className="cta-button">Book Now</button>
          </Link>
        </section>
      </main>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-profile">
          <img src="https://www.w3schools.com/howto/img_avatar.png" alt="User Avatar" className="sidebar-avatar" />
          <h4>{localStorage.getItem("role") || "Guest"}</h4>
        </div>

        <details open>
          <summary>Quick Links</summary>
          <ul>
            <li><Link to="/search">Search Flights</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </details>

        <details>
          <summary>Help & Support</summary>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/customer-service">Customer Service</Link></li>
          </ul>
        </details>

        {localStorage.getItem("role") ? (
          <button
            className="sidebar-action"
            onClick={() => {
              localStorage.removeItem("role");
              window.location.reload();
            }}
          >
            Logout
          </button>
        ) : (
          <button
            className="sidebar-action"
            onClick={() => {
              navigate("/auth");
            }}
          >
            Login
          </button>
        )}
      </aside>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}

// Testimonial component
function Testimonial({ name, feedback }) {
  return (
    <div className="testimonial-card">
      <p className="testimonial-feedback">"{feedback}"</p>
      <p className="testimonial-name">— {name}</p>
    </div>
  );
}

export default Home;
