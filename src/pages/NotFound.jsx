import { Link } from "react-router-dom";
import "../css/notfound.css"; // optional CSS

function NotFound() {
  return (
    <div className="notfound-container">
      <h1>🛫 404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist on SkyFly.</p>
      <Link to="/" className="back-home-btn">Go Home</Link>
    </div>
  );
}

export default NotFound;
