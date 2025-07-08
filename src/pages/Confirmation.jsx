import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/confirmation.css"; // Optional CSS file

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

  const {
    fullName,
    age,
    passport,
    seats,
    totalPrice,
    flightDetails
  } = bookingDetails;

  return (
    <div className="confirmation-page">
      <h1>Booking Confirmed! ✈️</h1>

      <div className="confirmation-section">
        <h2>Passenger Info</h2>
        <p><strong>Name:</strong> {fullName}</p>
        <p><strong>Age:</strong> {age}</p>
        <p><strong>Passport:</strong> {passport}</p>
        <p><strong>Seats:</strong> {seats.join(", ")}</p>
      </div>

      <div className="confirmation-section">
        <h2>Flight Info</h2>
        <p><strong>From:</strong> {flightDetails.departure}</p>
        <p><strong>To:</strong> {flightDetails.arrival}</p>
        <p><strong>Date:</strong> {flightDetails.date}</p>
        <p><strong>Time:</strong> {flightDetails.time}</p>
        <p><strong>Flight No:</strong> {flightDetails.flightNumber}</p>
      </div>

      <div className="confirmation-section">
        <h2>Total Price</h2>
        <p><strong>${totalPrice}</strong></p>
      </div>

      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}

export default Confirmation;
