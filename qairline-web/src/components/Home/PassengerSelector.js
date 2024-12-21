import React, { useState } from "react";
import "./PassengerSelector.scss";

const PassengerSelector = ({ onChangePassenger }) => {
  const [passengers, setPassengers] = useState({
    adults: 0,
    children: 0,
    type: "",
  });

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handlePassengerChange = (type, operation, event) => {
    event.preventDefault();
    setPassengers((prev) => {
      const newCount =
        operation === "increment"
          ? prev[type] + 1
          : prev[type] > 0
          ? prev[type] - 1
          : 0;
      return {
        ...prev,
        [type]: newCount,
      };
    });
    onChangePassenger(passengers);
  };
  const handleChangeType = (event) => {
    setPassengers((prev) => {
      return {
        ...prev,
        type: event.target.value,
      };
    });
    onChangePassenger(passengers);
  };

  const totalPassengers = passengers.adults + passengers.children;

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  return (
    <div className="passenger-custom">
      <div className="dropdown-label-custom" onClick={toggleDropdown}>
        Số vé: {totalPassengers} vé
        <span className={`arrow ${isDropdownVisible ? "open" : ""}`}>
          &#9660;
        </span>
      </div>
      {isDropdownVisible && (
        <div className="dropdown-content-custom">
          <div className="passenger-row">
            <span>Người lớn</span>
            <div className="counter">
              <button
                onClick={(event) =>
                  handlePassengerChange("adults", "decrement", event)
                }
                className="counter-btn"
              >
                −
              </button>
              <span>{passengers.adults}</span>
              <button
                onClick={(event) =>
                  handlePassengerChange("adults", "increment", event)
                }
                className="counter-btn"
              >
                +
              </button>
            </div>
          </div>
          <div className="passenger-row">
            <span>Trẻ em</span>
            <div className="counter">
              <button
                onClick={(event) =>
                  handlePassengerChange("children", "decrement", event)
                }
                className="counter-btn"
              >
                −
              </button>
              <span>{passengers.children}</span>
              <button
                onClick={(event) =>
                  handlePassengerChange("children", "increment", event)
                }
                className="counter-btn"
              >
                +
              </button>
            </div>
          </div>
          <div className="passenger-row">
            <label htmlFor="passengers">Hạng vé</label>
            <select
              value={passengers.type}
              onChange={handleChangeType}
              required
            >
              <option value="" disabled>
                -- Chọn loại vé --
              </option>
              <option value="economy">Phổ thông</option>
              <option value="business">Thương gia</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassengerSelector;
