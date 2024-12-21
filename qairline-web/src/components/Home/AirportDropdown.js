import React, { useState, useRef, useEffect } from "react";
import "./AirportDropdown.scss";
import FlightInfo from "./FlightInfo";

const AirportDropdown = ({ airports, placeholder, type, onValueChange, required }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Lọc danh sách sân bay dựa trên từ khóa tìm kiếm
  const filteredAirports = airports.filter((airport) =>
    airport.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Khi chọn một sân bay
  const handleSelectAirport = (airport) => {
    setSearchTerm(airport.name);
    onValueChange(airport);
    setDropdownVisible(false);
  };

  return (
    <div className="form-group" ref={dropdownRef}>
      <input
        type="text"
        className="airport-input"
        id={type}
        placeholder={placeholder}
        onFocus={() => { setDropdownVisible(true) }
        }
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }
        }
        value={searchTerm}
        required = {required}
      />
      {isDropdownVisible && (
        <div className="dropdown-custom-menu">
          {filteredAirports.length > 0 ? (
            filteredAirports.map((airport, index) =>
              <FlightInfo key={index} airport={airport} onSelect={handleSelectAirport} />
            )
          ) : (
            <div className="no-results">Không tìm thấy sân bay</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AirportDropdown;
