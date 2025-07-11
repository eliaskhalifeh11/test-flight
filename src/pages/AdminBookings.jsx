import React, { useState } from "react";
import "../css/adminBookings.css";

function AdminBookings() {
  const [bookings, setBookings] = useState([
    {
      booking_id: 1,
      user: "elie",
      flight_id: 1,
      total_price: 700,
      status: "confirmed",
      booking_date: "2025-08-01",
      passengers: [
        { name: "Elie Khalifeh", age: 22 },
        { name: "Maya Haddad", age: 21 },
      ],
    },
    {
      booking_id: 2,
      user: "elie",
      flight_id: 2,
      total_price: 450,
      status: "cancelled",
      booking_date: "2025-08-02",
      passengers: [{ name: "John Doe", age: 35 }],
    },
    {
      booking_id: 3,
      user: "admin",
      flight_id: 3,
      total_price: 500,
      status: "confirmed",
      booking_date: "2025-08-04",
      passengers: [{ name: "Ali Ahmad", age: 30 }],
    },
  ]);

  const [expandedBooking, setExpandedBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleTogglePassengers = (booking_id) => {
    setExpandedBooking((prev) => (prev === booking_id ? null : booking_id));
  };

  const handleCancelBooking = (id) => {
    const confirmCancel = window.confirm("Cancel this booking?");
    if (!confirmCancel) return;

    setBookings((prev) =>
      prev.map((b) =>
        b.booking_id === id ? { ...b, status: "cancelled" } : b
      )
    );
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.flight_id.toString().includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || b.status === statusFilter;

    const bookingDate = new Date(b.booking_date);
    const fromDate = startDate ? new Date(startDate) : null;
    const toDate = endDate ? new Date(endDate) : null;

    const matchesDate =
      (!fromDate || bookingDate >= fromDate) &&
      (!toDate || bookingDate <= toDate);

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="bookings-container">
      <h1>Manage Bookings</h1>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by username or flight ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <label>
          From:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>

        <label>
          To:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>User</th>
            <th>Flight ID</th>
            <th>Total ($)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredBookings.map((booking) => (
            <React.Fragment key={booking.booking_id}>
              <tr>
                <td>{booking.booking_id}</td>
                <td>{booking.user}</td>
                <td>{booking.flight_id}</td>
                <td>{booking.total_price}</td>
                <td
                  style={{
                    color: booking.status === "cancelled" ? "red" : "green",
                  }}
                >
                  {booking.status}
                </td>
                <td className="action-buttons">
                  <button
                    className="view-btn"
                    onClick={() => handleTogglePassengers(booking.booking_id)}
                  >
                    {expandedBooking === booking.booking_id
                      ? "Hide Details"
                      : "View Details"}
                  </button>
                  <button
                    className="cancel-btn"
                    disabled={booking.status === "cancelled"}
                    onClick={() => handleCancelBooking(booking.booking_id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>

              {expandedBooking === booking.booking_id && (
                <tr className="passenger-row">
                  <td colSpan="6">
                    <strong>Booking Date:</strong> {booking.booking_date}
                    <br />
                    <strong>Passenger Count:</strong>{" "}
                    {booking.passengers.length}
                    <br />
                    <strong>Passengers:</strong>
                    <ul>
                      {booking.passengers.map((p, idx) => (
                        <li key={idx}>
                          {p.name}, Age: {p.age}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminBookings;
