import { getByDisplayValue } from "@testing-library/react";
import "./FlightSearchItem.scss";
import { useState } from "react";

const FlightSearchItem = ({ flight, onShowDetails }) => {
  const getTimeHours = (time) => {
    const date = new Date(time);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  const getDay = (time) => {
    const date = new Date(time);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const [showDetails, setShowDetails] = useState(false);
  const [flightDetails, setFlightDetails] = useState(null);
  const subtractTimes = (time1, time2) => {
    const date1 = new Date(time1);
    const date2 = new Date(time2);

    const diffInMs = date1 - date2;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;

    return hours + 'h ' + minutes + 'm';
  };

  const formatNumber = (num) => {
    return num.toLocaleString('vi-VN');
  };

  return (
    <div>
      <div className="flight-result row">
        <div className="flight-details col-5 container">
          <div className="flight-general-info row">
            <p className="flight-time col-3">{getTimeHours(flight.departure_time)}</p>
            <div className="flight-line-info col">
              <p className="flight-summary-info text-center m-0">
                Ngày đi: {getDay(flight.departure_time)}
              </p>
              <p className="flight-line text-center">
                --------------------------------------------
              </p>
            </div>
            <p className="flight-time col-3 text-end">
              {getTimeHours(flight.arrival_time)}
            </p>
          </div>
          <div className="flight-airport-info row">
            <p className="flight-airport col-3">{flight.departureAirport.name}</p>
            <p className="flight-taken-time col text-center">{subtractTimes(flight.arrival_time, flight.departure_time)}</p>
            <p className="flight-airport col-3 text-end">{flight.arrivalAirport.name}</p>
          </div>
        </div>
        <div className="col-2"></div>
        <div className="pricing col-5 row">
          <div className="economy cursor col d-flex flex-column justify-content-between" onClick={() => onShowDetails(flight, "economy")}>
            <p className="flight-type m-0">Phổ thông</p>
            <p className="flight-remain-seats">Số vé còn lại: {flight.remaining_seats[0]} vé</p>
            <p className="flight-price m-0">{formatNumber(flight.economy_pricing)} VNĐ</p>
          </div>
          <div className="business cursor col d-flex flex-column justify-content-between" onClick={() => onShowDetails(flight, "business")}>
            <p className="flight-type m-0">Thương gia</p>
            <p className="flight-remain-seats">Số vé còn lại: {flight.remaining_seats[1]} vé</p>
            <p className="flight-price m-0">{formatNumber(flight.business_pricing)} VNĐ</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FlightSearchItem;
