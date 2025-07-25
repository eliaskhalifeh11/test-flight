import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/booking.css";

const SEAT_ROWS = 6;
const SEAT_COLUMNS = 4;
const SEAT_LETTERS = ["A", "B", "C", "D"];

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [flightDetails, setFlightDetails] = useState(null);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id; 


  useEffect(() => {
    console.log("Booking ID:", id);

    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (!isLoggedIn) {
      alert("You must be logged in to book a flight.");
      navigate("/auth");
      return;
    }

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
  }, [id, navigate]);

  if (!flightDetails) {
    return <div style={{ padding: 20 }}>Loading flight details...</div>;
  }

  const [passengers, setPassengers] = useState([
    { fullName: "", age: "", passportNumber: "", email: "" },
  ]);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    if (field === "fullName") {
      value = value.replace(/[0-9]/g, "");
    }
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      { fullName: "", age: "", passportNumber: "", email: "" },
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

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.id) {
    setError("User not logged in.");
    return;
  }

  const postData = {
    user_id: user.id,
    flight_id: parseInt(id),
    total_price: flightDetails.pricePerSeat * selectedSeats.length,
    booking_status: "Pending",
    seat_count: selectedSeats.length,
  };

  try {
    const res = await fetch("https://localhost:7162/api/Booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(postData),
    });

    if (!res.ok) throw new Error("Failed to complete booking");

    const confirmation = await res.json();
    navigate(`/confirmation?bookingId=${confirmation.booking_id}`);
  } catch (err) {
    setError("Booking failed. Please try again.");
    console.error(err);
  }
};

  return (
    <div className="booking-page">
      <h2>Booking for Flight ID: {id}</h2>

      <section className="flight-details">
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

      <form onSubmit={handleBooking}>
        {passengers.map((p, i) => (
          <fieldset key={i}>
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
                className="remove-passenger-btn"
                onClick={() => removePassenger(i)}
                aria-label={`Remove passenger #${i + 1}`}
              >
                X
              </button>
            )}
          </fieldset>
        ))}

        <button type="button" className="add-passenger-btn" onClick={addPassenger}>
          Add Passenger
        </button>

        <div>
          <h3>Select Your Seat(s)</h3>
          <div className="seat-map">
            {Array.from({ length: SEAT_ROWS }).map((_, rowIndex) => {
              return SEAT_LETTERS.map((letter) => {
                const seat = `${rowIndex + 1}${letter}`;
                const selected = selectedSeats.includes(seat);

                return (
                  <button
                    type="button"
                    key={seat}
                    className={`seat-button ${selected ? "selected" : ""}`}
                    onClick={() => toggleSeat(seat)}
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

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" className="submit-btn">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default Booking;
