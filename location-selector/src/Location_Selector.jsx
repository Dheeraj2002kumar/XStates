import './Location_Selector.css';
import React, { useState, useEffect } from "react";

// URL Endpoints
const COUNTRIES_URL = "https://crio-location-selector.onrender.com/countries";
const STATES_URL =
  "https://crio-location-selector.onrender.com/country={countryName}/states";
const CITIES_URL =
  "https://crio-location-selector.onrender.com/country={countryName}/state={stateName}/cities";

function LocationSelector() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    // Fetch all countries on initial render
    fetch(COUNTRIES_URL)
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    // Fetch states when a country is selected
    if (selectedCountry) {
      fetch(STATES_URL.replace("{countryName}", selectedCountry))
        .then((response) => response.json())
        .then((data) => setStates(data));
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    // Fetch cities when a state is selected
    if (selectedState) {
      fetch(
        CITIES_URL.replace("{countryName}", selectedCountry).replace(
          "{stateName}",
          selectedState
        )
      )
        .then((response) => response.json())
        .then((data) => setCities(data));
    } else {
      setCities([]);
    }
  }, [selectedState, selectedCountry]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedState(""); // Reset state and city
    setSelectedCity("");
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity(""); // Reset city selection
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div>
      <h1>Location Selector</h1>

      <div className="dropdown-body">
        {/* Country Dropdown */}
        <div>
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className="dropdown1"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* State Dropdown */}
        <div>
          <select
            value={selectedState}
            onChange={handleStateChange}
            disabled={!selectedCountry}
            className="dropdown2"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* City Dropdown */}
        <div>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedState}
            className="dropdown3"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display the selected location */}
      {selectedCity && selectedState && selectedCountry && (
        <p className="selected-location">
          You selected <span className="selected-city">{selectedCity}</span>,{" "}
          <span className="selected-state">{selectedState}</span>,{" "}
          <span className="selected-country">{selectedCountry}</span>
        </p>
      )}
    </div>
  );
}

export default LocationSelector;
