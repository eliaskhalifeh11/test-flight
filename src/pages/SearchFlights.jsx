import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/searchflights.css";


function SearchFlights() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
  });

  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement flight search logic here or mock results
    // For now, let's use mock data
    setResults([
      {
        id: 1,
        airline: "SkyFly Airlines",
        flightNumber: "SF123",
        departure: formData.from,
        arrival: formData.to,
        time: "10:00 AM - 1:00 PM",
        price: 199,
      },
      {
        id: 2,
        airline: "FlyHigh Airways",
        flightNumber: "FH456",
        departure: formData.from,
        arrival: formData.to,
        time: "3:00 PM - 6:00 PM",
        price: 220,
      },
    ]);
  };

  return (
    <div className="search-flights-container">
      <h1>Search Flights</h1>

      <form onSubmit={handleSearch} className="search-form">
        <label>
          From:
          <input
            type="text"
            name="from"
            value={formData.from}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          To:
          <input
            type="text"
            name="to"
            value={formData.to}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Departure Date:
          <input
            type="date"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Return Date:
          <input
            type="date"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
          />
        </label>

        <label>
          Passengers:
          <input
            type="number"
            name="passengers"
            min="1"
            max="10"
            value={formData.passengers}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Search</button>
      </form>

      <div className="search-results">
        {results.length > 0 ? (
          results.map(flight => (
            <div key={flight.id} className="flight-card">
              <h3>{flight.airline} - {flight.flightNumber}</h3>
              <p>{flight.departure} → {flight.arrival}</p>
              <p>{flight.time}</p>
              <p>Price: ${flight.price}</p>
              <Link to={`/booking/${flight.id}`}>
                <button>Book</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No results found. Please enter your search and click Search.</p>
        )}
      </div>
    </div>
  );
}

export default SearchFlights;
