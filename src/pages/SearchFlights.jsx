import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/searchflights.css";

import mea from "../assets/images/MEAL.png";
import qatar from "../assets/images/qatarL.png";
import Emirates from "../assets/images/Emirates.png";

function SearchFlights() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const city = query.get("city");

  const [airports, setAirports] = useState([]);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
    travelClass: "economy",
  });

  const [tripType, setTripType] = useState("oneway");
  const [results, setResults] = useState([]);
  const [filterMaxPrice, setFilterMaxPrice] = useState("");
  const [filterAirline, setFilterAirline] = useState("");
  const [sortBy, setSortBy] = useState("price-asc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [minDateTime, setMinDateTime] = useState("");
  const departureDate = new Date(formData.departureDate);
  const formattedDate = formatDateToYYYYMMDD(departureDate);
  console.log(formattedDate); // e.g., "2025-07-23"

  

  function formatDateToYYYYMMDD(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}


 


  useEffect(() => {
    if (city) {
      // Try to find matching airport code by city substring (case-insensitive)
      const found = airports.find(
        (a) =>
          a.airport_name.toLowerCase().includes(city.toLowerCase()) ||
          a.airport_code.toLowerCase() === city.toLowerCase()
      );
      if (found) {
        setFormData((prev) => ({ ...prev, to: found.airport_code }));
      }
    }
  }, [city, airports]);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const res = await fetch("https://localhost:7162/api/Airport");
        if (!res.ok) throw new Error("Failed to fetch airports");
        const data = await res.json();
        setAirports(data);
      } catch (error) {
        console.error("Failed to fetch airports", error);
      }
    };

    fetchAirports();

    const now = new Date();
    now.setSeconds(0, 0);
    setMinDateTime(now.toISOString().slice(0, 10)); // yyyy-mm-dd
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const classPriceMultiplier = {
    economy: 1,
    business: 1.5,
    first: 2,
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("Searching flights with", formData);
    setError("");
    setMessage("");
    setLoading(true);
    setResults([]);

    if (formData.from.trim().toLowerCase() === formData.to.trim().toLowerCase()) {
      setLoading(false);
      return setError("Departure and arrival airports cannot be the same.");
    }

    if (!formData.departureDate) {
      setLoading(false);
      return setError("Please select a departure date.");
    }

    const now = new Date();
    const departure = new Date(formData.departureDate);
    const arrival = new Date(formData.returnDate);

    if (departure < now) {
      setLoading(false);
      return setError("Departure date cannot be in the past.");
    }

    if (tripType === "roundtrip") {
      if (!formData.returnDate) {
        setLoading(false);
        return setError("Please select a return date.");
      }
      if (arrival < now) {
        setLoading(false);
        return setError("Return date cannot be in the past.");
      }
      if (arrival <= departure) {
        setLoading(false);
        return setError("Return date must be after departure date.");
      }
    }

    try {
     const formattedDate = formatDateToYYYYMMDD(formData.departureDate);

      const res = await fetch(
        `https://localhost:7162/api/Flight/search?from=${formData.from}&to=${formData.to}&departureDate=${formattedDate}`
      );

      if (!res.ok) throw new Error("Server error");
      const data = await res.json();

      const finalResults = data.map((f) => ({
        ...f,
        price: f.Price * formData.passengers * classPriceMultiplier[formData.travelClass],
      }));

      setResults(finalResults);
      if (finalResults.length > 0) {
        setMessage("✅ Flights loaded successfully.");
      } else {
        setMessage("No flights found for the selected route.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch flights. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const filteredSortedResults = results
    .filter((flight) => {
    if (filterMaxPrice && flight.price > Number(filterMaxPrice)) return false;
    if (filterAirline && flight.airline !== filterAirline) return false;
    return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "time-asc":
          return (
            new Date("1970/01/01 " + a.time.split(" - ")[0]) -
            new Date("1970/01/01 " + b.time.split(" - ")[0])
          );
        case "time-desc":
          return (
            new Date("1970/01/01 " + b.time.split(" - ")[0]) -
            new Date("1970/01/01 " + a.time.split(" - ")[0])
          );
        default:
          return 0;
      }
    });

  const getAirlineLogo = (airline) => {
    switch (airline) {
      case "SkyFly Airlines":
        return "https://img.icons8.com/color/48/airplane-take-off.png";
      case "FlyHigh Airways":
        return "https://img.icons8.com/color/48/paper-plane.png";
      case "MEA Airways":
        return mea;
      case "Qatar Airways":
        return qatar;
      case "Emirates  Airways":
        return Emirates;
      default:
        return "https://img.icons8.com/ios-filled/50/000000/airport.png";
    }
  };

const serverDate = "2025-07-23T00:00:00Z";
const inputValue = formatDateToYYYYMMDD(new Date(serverDate)); // sets "2025-07-23"


  return (
    
    <div className="search-flights-container">
      <h1>Search Flights</h1>

      <div className="trip-type-toggle">
        <label>
          <input
            type="radio"
            name="tripType"
            value="oneway"
            checked={tripType === "oneway"}
            onChange={() => setTripType("oneway")}
          />
          One Way
        </label>
        <label style={{ marginLeft: "20px" }}>
          <input
            type="radio"
            name="tripType"
            value="roundtrip"
            checked={tripType === "roundtrip"}
            onChange={() => setTripType("roundtrip")}
          />
          Round Trip
        </label>
      </div>

      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}

      <form onSubmit={handleSearch} className="search-form">
        <label>
          From:
          <select name="from" value={formData.from} onChange={handleChange} required>
            <option value="">From Airport</option>
            {airports.map((a) => (
              <option key={a.airport_id} value={a.airport_id}>
                {a.airport_name}
              </option>
            ))}
          </select>
          </label>

        <label>
          To:
          <select name="to" value={formData.to} onChange={handleChange} required>
            <option value="">To Airport</option>
            {airports.map((a) => (
              <option key={a.airport_id} value={a.airport_id}>
                {a.airport_name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Departure Date:
          <input
            type="date"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            required
            min={minDateTime}
          />
        </label>

        {tripType === "roundtrip" && (
          <label>
            Return Date:
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              required
              min={minDateTime}
            />
          </label>
        )}

        <label>
          Passengers:
          <input
            type="number"
            name="passengers"
            min="1"
            max="100"
            value={formData.passengers}
            onChange={handleChange}
          />
        </label>

        <label>
          Class:
          <select name="travelClass" value={formData.travelClass} onChange={handleChange}>
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="first">First Class</option>
          </select>
        </label>

        <button type="submit">Search</button>
      </form>

      <div className="filter-sort-controls">
        <label>
          Max Price: $
          <input
            type="number"
            min="0"
            value={filterMaxPrice}
            onChange={(e) => setFilterMaxPrice(e.target.value)}
            placeholder="No limit"
          />
        </label>

        <label>
          Airline:
          <select value={filterAirline} onChange={(e) => setFilterAirline(e.target.value)}>
            <option value="">All</option>
            <option value="SkyFly Airlines">SkyFly Airlines</option>
            <option value="FlyHigh Airways">FlyHigh Airways</option>
            <option value="MEA Airways">MEA Airways</option>
            <option value="Qatar Airways">Qatar Airways</option>
            <option value="Emirates  Airways">Emirates  Airways</option>
          </select>
        </label>

        <label>
          Sort By:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="time-asc">Time: Earliest First</option>
            <option value="time-desc">Time: Latest First</option>
          </select>
        </label>

        <button
          onClick={() => {
            setFilterMaxPrice("");
            setFilterAirline("");
            setSortBy("price-asc");
          }}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#0077cc",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
          type="button"
        >
          Reset Filters
        </button>
      </div>

      <div className="search-results">
        {loading ? (
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : filteredSortedResults.length > 0 ? (
          filteredSortedResults.map((flight) => (
            <div key={flight.id} className="flight-card">
              <div className="flight-header">
                <img
                  src={getAirlineLogo(flight.airline)}
                  alt={flight.airline}
                  className="airline-logo"
                />
                <div>
                  <h3>{flight.airline}</h3>
                  <small>{flight.flightNumber}</small>
                </div>
              </div>
              <p>
                {flight.departure} → {flight.arrival}
              </p>
              <p>{flight.time}</p>
              <p>Price: ${flight.price.toFixed(2)}</p>
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
