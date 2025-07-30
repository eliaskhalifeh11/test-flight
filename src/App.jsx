import { Routes, Route } from 'react-router-dom';
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';  // <-- import Footer here

import Home from './pages/Home';
import SearchFlights from './pages/SearchFlights';
import Booking from './pages/Booking';
import Payment from './pages/payment';
import Confirmation from './pages/Confirmation';
import AdminDashboard from './pages/AdminDashboard';
import AdminFlights from './pages/AdminFlights';
import AdminBookings from './pages/AdminBookings';
import NotFound from './pages/NotFound';
import Full from './pages/Full';
import AuthPage from "./pages/AuthPage";
import Faq from "./pages/Faq";
import ContactUs from "./pages/ContactUs";
import About from './pages/About';
import CustomerService from './pages/CustomerService';
import Profile  from "./pages/profile";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Full />}>
          <Route index element={<Home />} />
          <Route path="search" element={<SearchFlights />} />
           <Route path="/booking/:id" element={<Booking />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="faq" element={<Faq />} />
          <Route path="about" element={<About />} />
          <Route path="customer-service" element={<CustomerService />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="payment" element={<Payment />} />
          <Route path="confirmation" element={<Confirmation />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/flights" element={<AdminFlights />} />
          <Route path="admin/bookings" element={<AdminBookings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}


export default App;
