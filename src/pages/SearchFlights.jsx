import { useState } from "react";


function SearchFlights() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: 1,
  });

  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const mockResults = [
      {
        id: 1,
        from: "Beirut",
        to: "Dubai",
        date: "2025-08-01",
        price: "$350",
      },
      {
        id: 2,
        from: "Beirut",
        to: "Paris",
        date: "2025-08-01",
        price: "$500",
      },
    ];

    setResults(mockResults);
  };

  
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Search Flights</h2>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          name="from"
          placeholder="From"
          value={formData.from}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="to"
          placeholder="To"
          value={formData.to}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="passengers"
          min="1"
          value={formData.passengers}
          onChange={handleChange}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>
      </div>

      <h3>Results</h3>
      {results.length > 0 ? (
        <ul>
          {results.map((flight) => (
            <li key={flight.id}>
              ✈ {flight.from} → {flight.to} on {flight.date} — {flight.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results yet.</p>
      )}
    </div>
  );
}

const styles = {
  input: {
    marginRight: "1rem",
    padding: "0.5rem",
    fontSize: "1rem",
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default SearchFlights;
