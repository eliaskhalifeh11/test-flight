import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/booking.css";


const SEAT_ROWS = 6;
const SEAT_COLUMNS = 4;
const SEAT_LETTERS = ["A", "B", "C", "D"];

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock flight data - replace with real data source
  const flightDetails = {
    flightNumber: "SKY123",
    origin: "New York (JFK)",
    destination: "Dubai (DXB)",
    date: "2025-07-20",
    time: "10:30 AM",
    pricePerSeat: 350, // price per passenger seat
  };

  // Passenger info states for multiple passengers
  const [passengers, setPassengers] = useState([
    { fullName: "", age: "", passportNumber: "", email: "" },
  ]);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState("");

  // Handle input change for passengers array
  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    if (field === "fullName") {
      // Prevent digits in name
      value = value.replace(/[0-9]/g, "");
    }
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  // Add passenger form fields dynamically
  const addPassenger = () => {
    setPassengers([...passengers, { fullName: "", age: "", passportNumber: "", email: "" }]);
  };

  // Remove passenger by index
  const removePassenger = (index) => {
    if (passengers.length === 1) return; // at least 1 passenger
    setPassengers(passengers.filter((_, i) => i !== index));
    // Also remove seat if selected for that passenger
    // Note: You might want to implement this in a more sophisticated way matching passenger-seat pairs
  };

  // Toggle seat selection but restrict max seats = number of passengers
  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length < passengers.length) {
        setSelectedSeats([...selectedSeats, seat]);
      } else {
        alert(`You can only select ${passengers.length} seats for your passengers.`);
      }
    }
  };

  // Validate form before submission
  const handleBooking = (e) => {
    e.preventDefault();

    // Validate all passenger fields
    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      if (!p.fullName || !p.age || !p.passportNumber || !p.email) {
        setError(`Please fill all details for passenger #${i + 1}`);
        return;
      }
      if (isNaN(p.age) || p.age <= 0) {
        setError(`Please enter a valid age for passenger #${i + 1}`);
        return;
      }
    }

    if (selectedSeats.length !== passengers.length) {
      setError("Please select exactly one seat per passenger");
      return;
    }

    setError("");

    // Here you would send the booking to the backend

    alert(
      `Booking confirmed for ${passengers.length} passenger(s).\nSeats: ${selectedSeats.join(
        ", "
      )}\nTotal Price: $${flightDetails.pricePerSeat * selectedSeats.length}`
    );

    navigate("/confirmation");
  };

  return (
    <div
      className="booking-page"
      style={{ maxWidth: 700, margin: "40px auto", padding: "0 20px" }}
    >
      <h2>Booking for Flight ID: {id}</h2>

      <section
        className="flight-details"
        style={{
          backgroundColor: "#f3f4f6",
          padding: "15px 20px",
          borderRadius: "8px",
          marginBottom: "25px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Flight Details</h3>
        <p>
          <strong>Flight Number:</strong> {flightDetails.flightNumber}
        </p>
        <p>
          <strong>From:</strong> {flightDetails.origin}
        </p>
        <p>
          <strong>To:</strong> {flightDetails.destination}
        </p>
        <p>
          <strong>Date:</strong> {flightDetails.date}
        </p>
        <p>
          <strong>Time:</strong> {flightDetails.time}
        </p>
        <p>
          <strong>Price per seat:</strong> ${flightDetails.pricePerSeat}
        </p>
        <p>
          <strong>Total seats selected:</strong> {selectedSeats.length} / {passengers.length}
        </p>
        <p>
          <strong>Total price:</strong> ${flightDetails.pricePerSeat * selectedSeats.length}
        </p>
      </section>

      <form
        onSubmit={handleBooking}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        {passengers.map((p, i) => (
          <fieldset
            key={i}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px 15px",
              position: "relative",
            }}
          >
            <legend>Passenger #{i + 1}</legend>

            <label>
              Full Name:
              <input
                type="text"
                value={p.fullName}
                onChange={(e) => handlePassengerChange(i, "fullName", e.target.value)}
                required
              />
            </label>

            <label>
              Age:
              <input
                type="number"
                value={p.age}
                onChange={(e) => handlePassengerChange(i, "age", e.target.value)}
                min="1"
                required
              />
            </label>

            <label>
              Passport Number:
              <input
                type="text"
                value={p.passportNumber}
                onChange={(e) => handlePassengerChange(i, "passportNumber", e.target.value)}
                required
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                value={p.email}
                onChange={(e) => handlePassengerChange(i, "email", e.target.value)}
                required
              />
            </label>

            {passengers.length > 1 && (
              <button
                type="button"
                onClick={() => removePassenger(i)}
                style={{
                  position: "absolute",
                  top: 5,
                  right: 10,
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "2px 8px",
                }}
                aria-label={`Remove passenger #${i + 1}`}
              >
                X
              </button>
            )}
          </fieldset>
        ))}

        <button
          type="button"
          onClick={addPassenger}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "10px 15px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Add Passenger
        </button>

        <div>
          <h3>Select Your Seat(s)</h3>
          <div
            className="seat-map"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${SEAT_COLUMNS}, 50px)`,
              gap: "10px",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            {Array.from({ length: SEAT_ROWS }).map((_, rowIndex) => {
              return SEAT_LETTERS.map((letter) => {
                const seat = `${rowIndex + 1}${letter}`;
                const selected = selectedSeats.includes(seat);

                return (
                  <button
                    type="button"
                    key={seat}
                    onClick={() => toggleSeat(seat)}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 8,
                      border: selected ? "3px solid #007bff" : "1.5px solid #ccc",
                      backgroundColor: selected ? "#cce5ff" : "#f9f9f9",
                      cursor: "pointer",
                      fontWeight: "700",
                      userSelect: "none",
                      transition: "all 0.25s ease",
                    }}
                    aria-pressed={selected}
                    aria-label={`Seat ${seat}`}
                  >
                    {seat}
                  </button>
                );
              });
            })}
          </div>
        </div>

        {error && (
          <p style={{ color: "red", fontWeight: "600", textAlign: "center" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          style={{
            padding: "14px",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontSize: "1.2rem",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,123,255,0.5)",
            transition: "background-color 0.3s ease",
          }}
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default Booking;
