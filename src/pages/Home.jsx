import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/home.css";

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

  return (
    <div className="page-container">
     
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
              <img src="../assets/images/easy.png" alt="Easy Booking" className="feature-icon" />
              <strong>Easy Booking</strong>
              <p>Quickly find and book flights with a few clicks.</p>
            </div>
            <div className="feature-card">
              <img src="../assets/images/bestprice.png" alt="Best Prices" className="feature-icon" />
              <strong>Best Prices</strong>
              <p>Competitive pricing with no hidden fees.</p>
            </div>
            <div className="feature-card">
              <img src="/images/destinations.png" alt="Global Destinations" className="feature-icon" />
              <strong>Global Destinations</strong>
              <p>Fly to thousands of cities worldwide.</p>
            </div>
          </div>
        </section>

      </ScrollAnimationWrapper>

      {/* Popular Destinations */}
      <ScrollAnimationWrapper>
        <section className="destinations-section">
          <h2 className="section-title">Popular Destinations</h2>
          <div className="destinations-grid">
            <DestinationCard city="Dubai" imageUrl="https://source.unsplash.com/1600x900/?dubai" />
            <DestinationCard city="Paris" imageUrl="https://source.unsplash.com/1600x900/?paris" />
            <DestinationCard city="Istanbul" imageUrl="https://source.unsplash.com/1600x900/?istanbul" />
            <DestinationCard city="New York" imageUrl="https://source.unsplash.com/1600x900/?newyork" />
            <DestinationCard city="Tokyo" imageUrl="https://source.unsplash.com/1600x900/?tokyo,city" />
            <DestinationCard city="Rome" imageUrl="https://source.unsplash.com/1600x900/?rome,travel" />
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
    </div>
  );
}

// Reusable components
function DestinationCard({ city, imageUrl }) {
  return (
    <div className="destination-card">
      <img src={imageUrl} alt={city} className="destination-image" />
      <h3 className="destination-name">{city}</h3>
    </div>
  );
}

function Testimonial({ name, feedback }) {
  return (
    <div className="testimonial-card">
      <p className="testimonial-feedback">"{feedback}"</p>
      <p className="testimonial-name">— {name}</p>
    </div>
  );
}

export default Home;
