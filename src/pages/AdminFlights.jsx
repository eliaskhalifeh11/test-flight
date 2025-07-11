import { useState } from "react";
import "../css/adminFlights.css";

function AdminFlights() {
  const [flights, setFlights] = useState([
    {
      id: "F101",
      from: "BEY",
      to: "DXB",
      date: "2025-07-15",
      time: "14:30",
      price: 250,
    },
    {
      id: "F102",
      from: "BEY",
      to: "IST",
      date: "2025-07-17",
      time: "09:00",
      price: 180,
    },
  ]);

  // Form state
  const [form, setForm] = useState({
    id: "",
    from: "",
    to: "",
    date: "",
    time: "",
    price: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Reset form to empty for adding new flight
  const resetForm = () => {
    setForm({ id: "", from: "", to: "", date: "", time: "", price: "" });
    setIsEditing(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add or update flight on submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update existing flight
      setFlights((prev) =>
        prev.map((f) => (f.id === form.id ? { ...form, price: Number(form.price) } : f))
      );
    } else {
      // Check if flight ID already exists
      const exists = flights.some((f) => f.id === form.id);
      if (exists) {
        alert("Flight ID already exists!");
        return;
      }

      // Add new flight
      setFlights((prev) => [...prev, { ...form, price: Number(form.price) }]);
    }

    resetForm();
  };

  // Edit button: fill form with selected flight data
  const handleEdit = (flight) => {
    setForm({
      id: flight.id,
      from: flight.from,
      to: flight.to,
      date: flight.date,
      time: flight.time,
      price: flight.price.toString(),
    });
    setIsEditing(true);
  };

  // Delete button: confirm and remove flight
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this flight?")) {
      setFlights((prev) => prev.filter((flight) => flight.id !== id));

      // If currently editing this flight, reset form
      if (isEditing && form.id === id) resetForm();
    }
  };

  // Add New Flight button: clear form
  const handleAddNew = () => {
    resetForm();
  };

  return (
    <div className="flights-container">
      <h1>Manage Flights</h1>

      <button className="add-btn" onClick={handleAddNew}>
        {isEditing ? "Cancel Edit" : ".."}
      </button>

      {/* Flight Form */}
      <form className="flight-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          placeholder="Flight ID"
          value={form.id}
          onChange={handleInputChange}
          required
          disabled={isEditing} // Disable Flight ID editing when updating
        />
        <input
          type="text"
          name="from"
          placeholder="From"
          value={form.from}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="to"
          placeholder="To"
          value={form.to}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleInputChange}
          required
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleInputChange}
          min="0"
          required
        />

        <button type="submit" className="submit-btn">
          {isEditing ? "Update Flight" : "Add Flight"}
        </button>
      </form>

      {/* Flights Table */}
      <table>
        <thead>
          <tr>
            <th>Flight ID</th>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
            <th>Time</th>
            <th>Price ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.id}</td>
              <td>{flight.from}</td>
              <td>{flight.to}</td>
              <td>{flight.date}</td>
              <td>{flight.time}</td>
              <td>{flight.price}</td>
            <td className="action-buttons">
              <button className="edit-btn" onClick={() => handleEdit(flight)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(flight.id)}>Delete</button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminFlights;
