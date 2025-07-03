import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.pageContainer}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Welcome to SkyFly</h1>
          <p style={styles.heroSubtitle}>Book your next flight with ease and confidence</p>
          <Link to="/search">
            <button style={styles.heroButton}>Search Flights</button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Why Choose SkyFly?</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            ✈️ <strong>Easy Booking</strong>
            <p>Quickly find and book flights with a few clicks.</p>
          </div>
          <div style={styles.featureCard}>
            💸 <strong>Best Prices</strong>
            <p>Competitive pricing with no hidden fees.</p>
          </div>
          <div style={styles.featureCard}>
            🌍 <strong>Global Destinations</strong>
            <p>Fly to thousands of cities worldwide.</p>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section style={styles.destinationsSection}>
        <h2 style={styles.sectionTitle}>Popular Destinations</h2>
        <div style={styles.destinationsGrid}>
          <DestinationCard city="Dubai" imageUrl="https://source.unsplash.com/1600x900/?dubai" />
          <DestinationCard city="Paris" imageUrl="https://source.unsplash.com/1600x900/?paris" />
          <DestinationCard city="Istanbul" imageUrl="https://source.unsplash.com/1600x900/?istanbul" />
          <DestinationCard city="New York" imageUrl="https://source.unsplash.com/1600x900/?newyork" />
        </div>
      </section>

      {/* Testimonials */}
      <section style={styles.testimonialsSection}>
        <h2 style={styles.sectionTitle}>What Our Users Say</h2>
        <div style={styles.testimonialsGrid}>
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
    <div style={styles.destinationCard}>
      <img src={imageUrl} alt={city} style={styles.destinationImage} />
      <h3 style={styles.destinationName}>{city}</h3>
    </div>
  );
}

// Small component for Testimonials
function Testimonial({ name, feedback }) {
  return (
    <div style={styles.testimonialCard}>
      <p style={styles.testimonialFeedback}>"{feedback}"</p>
      <p style={styles.testimonialName}>— {name}</p>
    </div>
  );
}

const styles = {
  pageContainer: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  heroSection: {
    position: "relative",
    height: "450px",
    backgroundImage: "url('https://source.unsplash.com/1600x900/?airplane,sky')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  heroContent: {
    position: "relative",
    textAlign: "center",
    maxWidth: "600px",
    zIndex: 1,
  },
  heroTitle: {
    fontSize: "3.5rem",
    marginBottom: "0.5rem",
  },
  heroSubtitle: {
    fontSize: "1.5rem",
    marginBottom: "1.5rem",
  },
  heroButton: {
    padding: "15px 40px",
    fontSize: "1.2rem",
    borderRadius: "30px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    transition: "background-color 0.3s ease",
  },
  featuresSection: {
    padding: "3rem 1rem",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    marginBottom: "2rem",
    color: "#222",
  },
  featuresGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    flexWrap: "wrap",
  },
  featureCard: {
    flex: "1 1 250px",
    backgroundColor: "#f1f1f1",
    padding: "1.5rem",
    borderRadius: "15px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    fontSize: "1.1rem",
  },
  destinationsSection: {
    padding: "3rem 1rem",
    textAlign: "center",
    backgroundColor: "#fafafa",
  },
  destinationsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: "1.5rem",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  destinationCard: {
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  destinationImage: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
  },
  destinationName: {
    padding: "0.8rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  testimonialsSection: {
    padding: "3rem 1rem",
    textAlign: "center",
  },
  testimonialsGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    flexWrap: "wrap",
    maxWidth: "900px",
    margin: "0 auto",
  },
  testimonialCard: {
    backgroundColor: "#f1f1f1",
    borderRadius: "15px",
    padding: "1.5rem",
    maxWidth: "300px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  testimonialFeedback: {
    fontStyle: "italic",
    marginBottom: "1rem",
  },
  testimonialName: {
    fontWeight: "bold",
    textAlign: "right",
  },
  footer: {
    backgroundColor: "#222",
    color: "#aaa",
    padding: "1.5rem",
    textAlign: "center",
    marginTop: "3rem",
  },
  socialLink: {
    color: "#aaa",
    marginLeft: "0.5rem",
    textDecoration: "none",
  },
};

export default Home;
