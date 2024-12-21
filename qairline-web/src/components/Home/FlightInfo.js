import React from "react";
import "./FlightInfo.scss";

const FlightInfo = ({ airport, onSelect }) => {
  return (
    <div className="dropdown-custom-item" onClick={() => onSelect(airport)}>
      <div className="airport-left">
        <span className="airport-icon">✈️</span>
        <div className="airport-info">
          <div className="airport-name">{airport.name}</div>
          <div className="airport-country">{airport.country}</div>
        </div>
      </div>
      <div className="airport-right">
        <div className="airport-code">{airport.code}</div>
        <div className="airport-full-name">{airport.fullName}</div>
      </div>
    </div>
  );
};

export default FlightInfo;
