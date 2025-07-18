  import { useEffect, useState } from "react";
  import { Link, useLocation } from "react-router-dom";
  //-import { useLocation } from "react-router-dom";
  import "../css/searchflights.css";


  import mea from "../assets/images/MEAL.png";
  import qatar from "../assets/images/qatarL.png";
  import Emirates from "../assets/images/Emirates.png";
  

  function SearchFlights() {
    const location = useLocation(); 
    console.log(location.pathname);// 👈 Add this line
    const query = new URLSearchParams(location.search );
    const city = query.get("city"); 
    const [formData, setFormData] = useState({
      from: "",
      to: "",
      departureDate: "",
      returnDate: "",
      passengers: 1,
      travelClass: "economy",
    });


  useEffect(() => {
    if (city) {
      setFormData((prev) => ({ ...prev, to: city }));
    }
  }, [city]);

    const [tripType, setTripType] = useState("oneway");
    const [results, setResults] = useState([]);
    const [filterMaxPrice, setFilterMaxPrice] = useState("");
    const [filterAirline, setFilterAirline] = useState("");
    const [sortBy, setSortBy] = useState("price-asc");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState(""); // ✅ NEW state for feedback
  



    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const classPriceMultiplier = {
      economy: 1,
      business: 1.5,
      first: 2,
    };

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");
    setMessage(""); // ✅ Clear any old messages
    setLoading(true);
    setResults([]);

    if (formData.from.trim().toLowerCase() === formData.to.trim().toLowerCase()) {
      setLoading(false);
      return setError("Departure and arrival cities cannot be the same.");
    }

    if (!formData.departureDate) {
      setLoading(false);
      return setError("Please select a departure date.");
    }

    if (tripType === "roundtrip") {
      if (!formData.returnDate) {
        setLoading(false);
        return setError("Please select a return date for round trip.");
      }
      if (new Date(formData.returnDate) < new Date(formData.departureDate)) {
        setLoading(false);
        return setError("Return date cannot be before departure date.");
      }
    }

    const basePrices = [199, 220, 240, 180, 210];
    const totalPrices = basePrices.map(
      (price) => price * formData.passengers * classPriceMultiplier[formData.travelClass]
    );

    const mockResults = [
      {
        id: 1,
        airline: "SkyFly Airlines",
        flightNumber: "SF123",
        departure: formData.from,
        arrival: formData.to,
        time: "10:00 AM - 1:00 PM",
        price: totalPrices[0],
      },
      {
        id: 2,
        airline: "FlyHigh Airways",
        flightNumber: "FH456",
        departure: formData.from,
        arrival: formData.to,
        time: "3:00 PM - 6:00 PM",
        price: totalPrices[1],
      },
      {
        id: 3,
        airline: "MEA Airways",
        flightNumber: "EK957",
        departure: formData.from,
        arrival: formData.to,
        time: "5:00 PM - 8:00 PM",
        price: totalPrices[2],
      },
      {
        id: 4,
        airline: "Qatar Airways",
        flightNumber: "TK846",
        departure: formData.from,
        arrival: formData.to,
        time: "1:00 PM - 4:00 PM",
        price: totalPrices[3],
      },
      {
        id: 5,
        airline: "Emirates  Airways",
        flightNumber: "EK961",
        departure: formData.from,
        arrival: formData.to,
        time: "8:00 PM - 11:00 PM",
        price: totalPrices[4],
      },
    ];

    setTimeout(() => {
      setResults(mockResults);
      setLoading(false);
      setMessage("✅ Flights loaded successfully. You can now filter or sort.");
    }, 1500);
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
            return "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/MEA_logo.png/220px-MEA_logo.png";
          case "Qatar Airways":
            return "https://upload.wikimedia.org/wikipedia/commons/2/26/Qatar_Airways_Logo.svg";
          case "Emirates  Airways":
            return "https://upload.wikimedia.org/wikipedia/commons/4/4c/Emirates_logo.svg";
          default:
            return "https://img.icons8.com/ios-filled/50/000000/airport.png";
        }
      };



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


        <form onSubmit={handleSearch} className="search-form">
          {/* ...your input fields... */}

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

          {tripType === "roundtrip" && (
            <label>
              Return Date:
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                required={tripType === "roundtrip"}
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
            <select
              name="travelClass"
              value={formData.travelClass}
              onChange={handleChange}
            >
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
              style={{ width: "100px", marginRight: "20px" }}
            />
          </label>

          <label>
            Airline:
            <select
              value={filterAirline}
              onChange={(e) => setFilterAirline(e.target.value)}
              style={{ marginLeft: "5px", marginRight: "20px" }}
            >
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
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ marginLeft: "5px" }}
            >
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
                height: "40px",
                alignSelf: "flex-end"
              }}
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