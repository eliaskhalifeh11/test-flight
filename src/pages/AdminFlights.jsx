import { useState, useEffect } from "react";
import "../css/adminFlights.css";

function AdminFlights() {
  const [flights, setFlights] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [airports, setAirports] = useState([]);
  const [minDateTime, setMinDateTime] = useState("");

  

  const [form, setForm] = useState({
    flightId: null,
    flightNum: "",
    airline_id: "",
    fromAirportId: "",
    toAirportId: "",
    scheduleDeparture: "",
    scheduleArrival: "",
    basePrice: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
     const now = new Date();
  now.setSeconds(0, 0); // zero seconds and ms
  const isoString = now.toISOString();
  setMinDateTime(isoString.slice(0, 16));
    fetchAirlines();
    fetchAirports();
    fetchFlights();
  }, []);

  const fetchAirlines = async () => {
    try {
      const res = await fetch("https://localhost:7162/api/Airline");
      const data = await res.json();
      setAirlines(data);
    } catch (error) {
      console.error("Failed to fetch airlines", error);
    }
  };

  const fetchAirports = async () => {
    try {
      const res = await fetch("https://localhost:7162/api/Airport");
      const data = await res.json();
      setAirports(data);
    } catch (error) {
      console.error("Failed to fetch airports", error);
    }
  };

  const fetchFlights = async () => {
    try {
      const res = await fetch("https://localhost:7162/api/Flight");
      const data = await res.json();
      setFlights(data);
    } catch (error) {
      console.error("Failed to fetch flights", error);
    }
  };

  const resetForm = () => {
    setForm({
      flightNum: "",
      airline_id: "",
      fromAirportId: "",
      toAirportId: "",
      scheduleDeparture: "",
      scheduleArrival: "",
      basePrice: "",
    });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


const getCurrentDateTimeLocal = () => {
  const now = new Date();
  now.setSeconds(0, 0); // remove seconds and milliseconds for input format compatibility
  const isoString = now.toISOString(); // e.g. 2025-07-22T10:15:00.000Z
  return isoString.slice(0, 16); // "2025-07-22T10:15"
};



 const handleSubmit = async (e) => {
  e.preventDefault();

  if (
  !form.flightNum ||
  !form.airline_id ||
  !form.fromAirportId ||
  !form.toAirportId ||
  !form.scheduleDeparture ||
  !form.scheduleArrival ||
  !form.basePrice
) {
  alert("Please fill all fields.");
  return;
}

if (form.fromAirportId === form.toAirportId) {
  alert("Departure and arrival airports cannot be the same.");
  return;
}

  // ✅ Check uniqueness if adding (not editing)
  if (!isEditing) {
    const flightExists = flights.some(
      (flight) => flight.flight_num.toLowerCase() === form.flightNum.toLowerCase()
    );
    if (flightExists) {
      alert("Flight number already exists.");
      return;
    }
  }
const now = new Date();
const departureDate = new Date(form.scheduleDeparture);
const arrivalDate = new Date(form.scheduleArrival);

if (departureDate < now) {
  alert("Departure date/time cannot be in the past.");
  return;
}

if (arrivalDate < now) {
  alert("Arrival date/time cannot be in the past.");
  return;
}

if (arrivalDate <= departureDate) {
  alert("Arrival time must be after departure time.");
  return;
}



  const payload = {
    flight_num: form.flightNum,
    airline_id: parseInt(form.airline_id),
    from_airport_id: parseInt(form.fromAirportId),
    to_airport_id: parseInt(form.toAirportId),
    schedule_departure: form.scheduleDeparture,
    schedule_arrival: form.scheduleArrival,
    actual_departure: form.scheduleDeparture,
    actual_arrival: form.scheduleArrival,
    base_price: parseFloat(form.basePrice),
  };

  try {
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `https://localhost:7162/api/Flight/${form.flightId}`
      : "https://localhost:7162/api/Flight";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      let msg = "Failed to save flight";
      const text = await res.text();
      if (text) {
        try {
          const err = JSON.parse(text);
          msg = err.message || msg;
        } catch {}
      }
      throw new Error(msg);
    }

    alert(isEditing ? "Flight updated" : "Flight added");
    resetForm();
    fetchFlights();
  } catch (error) {
    alert(error.message);
  }
};


  const handleEdit = (flight) => {
    setForm({
      flightId: flight.flight_id,
      flightNum: flight.flight_num,
      airline_id: flight.airline_id?.toString() ?? "",
      fromAirportId: flight.from_airport_id?.toString() ?? "",
      toAirportId: flight.to_airport_id?.toString() ?? "",
      scheduleDeparture: flight.schedule_departure
        ? flight.schedule_departure.slice(0, 16)
        : "",
      scheduleArrival: flight.schedule_arrival
        ? flight.schedule_arrival.slice(0, 16)
        : "",
      basePrice: flight.base_price?.toString() ?? "",
    });
    setIsEditing(true);
  };

  const handleDelete = async (flightId) => {
    if (!window.confirm("Delete this flight?")) return;

    try {
      const res = await fetch(`https://localhost:7162/api/Flight/${flightId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete flight");

      alert("Flight deleted");
      fetchFlights();
      if (isEditing && form.flightNum === flightNum) resetForm();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flights-container">
      <h1>Manage Flights</h1>

      <button className="add-btn" onClick={resetForm}>
        {isEditing ? "Cancel Edit" : "Add New Flight"}
      </button>

      <form className="flight-form-admin" onSubmit={handleSubmit}>
        <input
          type="text"
          name="flightNum"
          placeholder="Flight Number"
          value={form.flightNum}
          onChange={handleInputChange}
          required
          disabled={isEditing}
        />
        

        <select className="airline_id" value={form.airline_id} onChange={handleInputChange} required>
          <option value="">Select Airline</option>
          {airlines.map((a) => (
            <option key={a.airline_id} value={a.airline_id}>
              {a.airline_name}
            </option>
          ))}
        </select>

        <select className="fromAirportId" value={form.fromAirportId} onChange={handleInputChange} required>
          <option value="">From Airport</option>
          {airports.map((a) => (
            <option key={a.airport_id} value={a.airport_id}>
              {a.airport_name}
            </option>
          ))}
        </select>

        <select className="toAirportId" value={form.toAirportId} onChange={handleInputChange} required>
          <option value="">To Airport</option>
          {airports.map((a) => (
            <option key={a.airport_id} value={a.airport_id}>
              {a.airport_name}
            </option>
          ))}
        </select>

     
  Departure:
 <input
  type="datetime-local"
  name="scheduleDeparture"
  value={form.scheduleDeparture}
  onChange={handleInputChange}
  required
  min={minDateTime}
/>




  Arrival:
  <input
  type="datetime-local"
  name="scheduleArrival"
  value={form.scheduleArrival}
  onChange={handleInputChange}
  required
  min={minDateTime}
/>


        <div className="basep">
          <input
            type="number"
            name="basePrice"
            placeholder="Base Price"
            min="0"
            value={form.basePrice}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="" className="submit-btn-flight">
          {isEditing ? "Update Flight" : "Add Flight"}
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Airline</th>
            <th>From</th>
            <th>To</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Price ($)</th>
            <th>Created At</th>
            <th>Last Edited</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.flight_num}>
              <td>{flight.flight_num}</td>
              <td>{airlines.find((a) => a.airline_id === flight.airline_id)?.airline_name || flight.airline_id}</td>
              <td>{airports.find((a) => a.airport_id === flight.from_airport_id)?.airport_name || flight.from_airport_id}</td>
              <td>{airports.find((a) => a.airport_id === flight.to_airport_id)?.airport_name || flight.to_airport_id}</td>
              <td>{new Date(flight.schedule_departure).toLocaleString()}</td>
              <td>{new Date(flight.schedule_arrival).toLocaleString()}</td>
              <td>{flight.base_price}</td>
              <td>{flight.created_at ? new Date(flight.created_at).toLocaleString() : "N/A"}</td>
              <td>{flight.updated_at ? new Date(flight.updated_at).toLocaleString() : "Never Edited"}</td>
              <td className="action-buttons">
                <button className="edit-btn" onClick={() => handleEdit(flight)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(flight.flight_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminFlights;
