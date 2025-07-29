import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/booking.css";

const SEAT_ROWS = 6;
const SEAT_LETTERS = ["A", "B", "C", "D"];

function Booking() {
  const { id } = useParams(); // flight_id
  const navigate = useNavigate();

  const [airports, setAirports] = useState([]);
  const [flightDetails, setFlightDetails] = useState(null);
  const [error, setError] = useState("");
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const [passengers, setPassengers] = useState([
    { fullName: "", age: "", passportNumber: "", email: "", phone: "", address: "" },
  ]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    const user = JSON.parse(localStorage.getItem("user"));

    if (!isLoggedIn || !user) {
      alert("You must be logged in to book a flight.");
      navigate("/auth");
      return;
    }

    // Fetch flight details
    const fetchFlightDetails = async () => {
      try {
        const res = await fetch(`https://localhost:7162/api/Flight/${id}`);
        if (!res.ok) throw new Error("Failed to load flight details");
        const data = await res.json();
        setFlightDetails(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load flight details.");
      }
    };

    fetchFlightDetails();

    // Fetch airports
    fetch("https://localhost:7162/api/Airport")
      .then((res) => res.json())
      .then(setAirports)
      .catch((err) => console.error("Failed to fetch airports", err));
  }, [id, navigate]);

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      { fullName: "", age: "", passportNumber: "", email: "", phone: "", address: "" },
    ]);
  };

  const removePassenger = (index) => {
    if (passengers.length === 1) return;
    setPassengers(passengers.filter((_, i) => i !== index));
  };

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

  const handleBooking = async (e) => {
  e.preventDefault();
  setError("");

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    setError("User not logged in.");
    return;
  }

  // Validate required passenger fields only
  for (let i = 0; i < passengers.length; i++) {
    const p = passengers[i];
    if (!p.passportNumber || !p.phone || !p.address) {
      setError(`Please fill passport number, phone, and address for passenger #${i + 1}`);
      return;
    }
  }

  if (selectedSeats.length !== passengers.length) {
    setError("Please select exactly one seat per passenger");
    return;
  }

  try {
   
    const passengerPayload = passengers.map((p) => ({
      user_id: user.user_id,
      passport_number: p.passportNumber,
      phone: p.phone,
      address: p.address,
    }));

    
    for (const p of passengerPayload) {
      await fetch("https://localhost:7162/api/Passenger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: p.user_id,
          booking_id: bookingId,
          passport_number: p.passport_number,
          phone: p.phone,
          address: p.address,
        }),
      });
    }

    setShowConfirmationPopup(true);
  } catch (err) {
    console.error(err);
    setError("Failed to save passengers.");
  }
};


  const getAirportName = (id) => {
    const airport = airports.find((a) => a.airport_id === id);
    return airport ? airport.airport_name : "Unknown";
  };

  if (!flightDetails) return <div>Loading...</div>;

  return (
    <div className="booking-page">
      <h2>Booking for Flight ID: {id}</h2>

      <section className="flight-details">
        <h3>Flight Details</h3>
        <p><strong>Flight Number:</strong> {flightDetails.flight_num}</p>
        <p><strong>From:</strong> {getAirportName(flightDetails.from_airport_id)}</p>
        <p><strong>To:</strong> {getAirportName(flightDetails.to_airport_id)}</p>
        <p><strong>Departure:</strong> {new Date(flightDetails.schedule_departure).toLocaleString()}</p>
        <p><strong>Arrival:</strong> {new Date(flightDetails.schedule_arrival).toLocaleString()}</p>
        <p><strong>Price per seat:</strong> ${flightDetails.base_price.toFixed(2)}</p>
        <p><strong>Total seats selected:</strong> {selectedSeats.length} / {passengers.length}</p>
        <p><strong>Total price:</strong> ${totalPrice.toFixed(2)}</p>
      </section>

      <form onSubmit={handleBooking}>
        {passengers.map((p, i) => (
          <fieldset key={i}>
            <legend>Passenger #{i + 1}</legend>
            <input
              type="text"
              placeholder="Full Name"
              value={p.fullName}
              onChange={(e) => handlePassengerChange(i, "fullName", e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={p.age}
              onChange={(e) => handlePassengerChange(i, "age", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Passport Number"
              value={p.passportNumber}
              onChange={(e) => handlePassengerChange(i, "passportNumber", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Phone"
              value={p.phone}
              onChange={(e) => handlePassengerChange(i, "phone", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={p.address}
              onChange={(e) => handlePassengerChange(i, "address", e.target.value)}
              required
            />
            {passengers.length > 1 && (
              <button type="button" onClick={() => removePassenger(i)}>Remove</button>
            )}
          </fieldset>
        ))}

        <button type="button" onClick={addPassenger}>Add Passenger</button>

        <h3>Select Seats</h3>
        <div className="seat-map">
          {Array.from({ length: SEAT_ROWS }).map((_, rowIndex) =>
            SEAT_LETTERS.map((letter) => {
              const seat = `${rowIndex + 1}${letter}`;
              const selected = selectedSeats.includes(seat);
              return (
                <button
                  type="button"
                  key={seat}
                  className={`seat-button ${selected ? "selected" : ""}`}
                  onClick={() => toggleSeat(seat)}
                >
                  {seat}
                </button>
              );
            })
          )}
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button type="submit">Confirm Booking</button>
      </form>

      {showConfirmationPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Booking Successful</h3>
            <p>Do you want to proceed to payment?</p>
            <div className="popup-buttons">
              <button onClick={() => setShowConfirmationPopup(false)}>Cancel</button>
              <button onClick={() => navigate(`/payment?bookingId=${bookingId}&total=${totalPrice}`)}>Proceed to Payment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;
