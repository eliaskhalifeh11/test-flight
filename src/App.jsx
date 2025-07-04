import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';  // <-- import Footer here

import Home from './pages/Home';
import SearchFlights from './pages/SearchFlights';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';
import AdminDashboard from './pages/AdminDashboard';
import AdminFlights from './pages/AdminFlights';
import AdminBookings from './pages/AdminBookings';
import NotFound from './pages/NotFound';
import Full from './pages/Full';
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
    
        <Routes>
         <Route path="/" element={<Full />}>
            <Route index element={<Home />} />
            <Route path="search" element={<SearchFlights />} />
            <Route path="booking/:id" element={<Booking />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="payment" element={<Payment />} />
            <Route path="confirmation" element={<Confirmation />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/flights" element={<AdminFlights />} />
            <Route path="admin/bookings" element={<AdminBookings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
    </>
  );
}

export default App;
