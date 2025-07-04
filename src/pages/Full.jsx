import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/layout.css"; // Import your layout CSS here

function Full() {
  return (
    <div className="page-layout">
      <Navbar />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}


export default Full;
