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
  const stats = {
    totalFlights: 42,
    totalUsers: 150,
    totalBookings: 87,
    totalRevenue: 12450,
  };

  const recentBookings = [
    { id: "B001", user: "John Doe", flight: "BEY → DXB", date: "2025-07-10", seats: 2 },
    { id: "B002", user: "Sarah Lee", flight: "BEY → LHR", date: "2025-07-09", seats: 1 },
    { id: "B003", user: "Ali Hammoud", flight: "BEY → CDG", date: "2025-07-08", seats: 3 },
  ];

  const upcomingFlights = [
    { id: "F101", from: "BEY", to: "DXB", date: "2025-07-13", time: "14:30" },
    { id: "F102", from: "BEY", to: "IST", date: "2025-07-14", time: "10:15" },
    { id: "F103", from: "BEY", to: "FRA", date: "2025-07-15", time: "09:45" },
  ];

  const revenueData = [
  { month: "Jan", revenue: 1000 },
  { month: "Feb", revenue: 1800 },
  { month: "Mar", revenue: 2500 },
  { month: "Apr", revenue: 3100 },
  { month: "May", revenue: 2200 },
  { month: "Jun", revenue: 3600 },
];

const bookingData = [
  { flight: "BEY-DXB", bookings: 25 },
  { flight: "BEY-LHR", bookings: 18 },
  { flight: "BEY-CDG", bookings: 32 },
  { flight: "BEY-IST", bookings: 20 },
];


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

        {/* Charts Section */}
<div className="section">
  <h2>Monthly Revenue</h2>
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="revenue" stroke="#007bff" strokeWidth={2} />
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
    </div>

    
  );
}

export default AdminDashboard;
