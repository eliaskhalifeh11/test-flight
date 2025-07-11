import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/confirmation.css";

function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const { bookingDetails } = location.state || {};

  if (!bookingDetails) {
    return (
      <div className="confirmation-page">
        <h2>No booking information found.</h2>
        <button onClick={() => navigate("/")}>Go to Home</button>
      </div>
    );
  }

  const { passengers = [], seats = [], totalPrice, flightDetails, bookingId } = bookingDetails;

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(flightDetails.date));

  return (
    <div className="confirmation-page">
      <h1>Booking Confirmed! ✈️</h1>

      <div className="confirmation-section">
        <h2>Booking Reference</h2>
        <p><strong>Booking ID:</strong> {bookingId || "N/A"}</p>
      </div>

      <div className="confirmation-section">
        <h2>Passenger Info</h2>
        {passengers.map((p, index) => (
          <div key={index} className="passenger-block">
            <p><strong>Name:</strong> {p.fullName}</p>
            <p><strong>Age:</strong> {p.age}</p>
            <p><strong>Passport:</strong> {p.passport}</p>
            <hr />
          </div>
        ))}
        <p><strong>Seats:</strong> {seats.join(", ")}</p>
      </div>

      <div className="confirmation-section">
        <h2>Flight Info</h2>
        <p><strong>From:</strong> {flightDetails.departure}</p>
        <p><strong>To:</strong> {flightDetails.arrival}</p>
        <p><strong>Date:</strong> {formattedDate}</p>
        <p><strong>Time:</strong> {flightDetails.time}</p>
        <p><strong>Flight No:</strong> {flightDetails.flightNumber}</p>
      </div>

      <div className="confirmation-section">
        <h2>Total Price</h2>
        <p><strong>${totalPrice}</strong></p>
      </div>

      <div className="confirmation-buttons">
        <button onClick={() => navigate("/")}>Back to Home</button>
        <button onClick={() => window.print()}>Print Confirmation</button>
      </div>
    </div>
  );
}

export default Confirmation;
