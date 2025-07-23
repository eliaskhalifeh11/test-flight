import { useEffect, useState } from "react";
import "../css/adminDashboard.css";
import { FaPlane, FaUser, FaClipboardList, FaDollarSign } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalFlights: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [upcomingFlights, setUpcomingFlights] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [bookingData, setBookingData] = useState([]);

  // Optional: loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      fetch("https://localhost:7162/api/Dashboard/stats").then((res) => res.json()),
      fetch("https://localhost:7162/api/Dashboard/recent-bookings").then((res) => res.json()),
      fetch("https://localhost:7162/api/Dashboard/upcoming-flights").then((res) => res.json()),
      fetch("https://localhost:7162/api/Dashboard/monthly-revenue").then((res) => res.json()),
      fetch("https://localhost:7162/api/Dashboard/bookings-per-flight").then((res) => res.json()),
    ])
      .then(
        ([
          statsData,
          recentBookingsData,
          upcomingFlightsData,
          revenueDataResp,
          bookingDataResp,
        ]) => {
          setStats(statsData);
          setRecentBookings(recentBookingsData);
          setUpcomingFlights(upcomingFlightsData);
          setRevenueData(revenueDataResp);
          setBookingData(bookingDataResp);
          setLoading(false);
        }
      )
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="dashboard-container">Loading...</div>;
  if (error) return <div className="dashboard-container">Error: {error}</div>;

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

      {/* Top Stats */}
      <div className="stats-grid">
        <div className="card">
          <FaPlane className="icon" />
          <h3>Total Flights</h3>
          <p>{stats.totalFlights}</p>
        </div>
        <div className="card">
          <FaUser className="icon" />
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="card">
          <FaClipboardList className="icon" />
          <h3>Total Bookings</h3>
          <p>{stats.totalBookings}</p>
        </div>
        <div className="card">
          <FaDollarSign className="icon" />
          <h3>Total Revenue ($)</h3>
          <p>${stats.totalRevenue}</p>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="section">
        <h2>Recent Bookings</h2>
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User</th>
              <th>Flight</th>
              <th>Date</th>
              <th>Seats</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.user}</td>
                <td>{b.flight}</td>
                <td>{b.date}</td>
                <td>{b.seats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upcoming Flights */}
      <div className="section">
        <h2>Upcoming Flights</h2>
        <table>
          <thead>
            <tr>
              <th>Flight ID</th>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {upcomingFlights.map((f) => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>{f.from}</td>
                <td>{f.to}</td>
                <td>{f.date}</td>
                <td>{f.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div className="section">
        <h2>Monthly Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={revenueData}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#007bff"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="section">
        <h2>Bookings per Flight</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bookingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="flight" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="bookings" fill="#28a745" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AdminDashboard;
