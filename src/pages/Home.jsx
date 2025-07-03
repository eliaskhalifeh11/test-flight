import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/home.css";

function ScrollAnimationWrapper({ children }) {
  const [visible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(domRef.current);
        }
      });
    });
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`animate-on-scroll ${visible ? "visible" : ""}`}
      ref={domRef}
    >
      {children}
    </div>
  );
}

function Home() {
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
              ✈️ <strong>Easy Booking</strong>
              <p>Quickly find and book flights with a few clicks.</p>
            </div>
            <div className="feature-card">
              💸 <strong>Best Prices</strong>
              <p>Competitive pricing with no hidden fees.</p>
            </div>
            <div className="feature-card">
              🌍 <strong>Global Destinations</strong>
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
    </div>
  );
}

// Small component for Destination cards
function DestinationCard({ city, imageUrl }) {
  return (
    <div className="destination-card">
      <img src={imageUrl} alt={city} className="destination-image" />
      <h3 className="destination-name">{city}</h3>
    </div>
  );
}

// Small component for Testimonials
function Testimonial({ name, feedback }) {
  return (
    <div className="testimonial-card">
      <p className="testimonial-feedback">"{feedback}"</p>
      <p className="testimonial-name">— {name}</p>
    </div>
  );
}

export default Home;
