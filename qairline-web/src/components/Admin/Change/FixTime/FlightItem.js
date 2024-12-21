import React from "react";
import "./FlightItem.scss";

const FlightItem = ({ flight, toggleChange }) => {
  const getTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return minutes === 0 ? `${hours}:00` : `${hours}:${minutes}`;
  };

  const formatNumber = (num) => {
    return num.toLocaleString('vi-VN');
  };
  const subtractTimes = (time1, time2) => {
    const date1 = new Date(time1);
    const date2 = new Date(time2);

    const diffInMs = date1 - date2;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;

    return { hours, minutes };
  };
  const getDateVn = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}-${month}-${year}`;
  };
  return (
    <div className="flight-card-custom">
      <div className="flight-schedule">
        <div className="time-location">
          <span className="time">{getTime(flight.departure_time)}</span>
          <span className="airport">{flight.fromCode}</span>
          <span className="code">{flight.from}</span>
        </div>
        <div className="direct-flight">Bay thẳng</div>
        <div className="time-location">
          <span className="time">{getTime(flight.arrival_time)}</span>
          <span className="airport">{flight.toCode}</span>
          <span className="code">{flight.to}</span>
        </div>
      </div>

      <div className="flight-details">
        <div className="duration">
          ⏱ Thời gian bay{" "}
          {subtractTimes(flight.arrival_time, flight.departure_time).hours} giờ{" "}
          {subtractTimes(flight.arrival_time, flight.departure_time).minutes}{" "}
          phút
        </div>
        <div className="duration">
          {" "}
          Ngày bay {getDateVn(flight.departure_time)}
        </div>
        <p
          className="details-link"
          onClick={() => {
            toggleChange(flight.id);
          }}
        >
          Chi tiết chuyến bay
        </p>
      </div>

      <div className="ticket-info">
        <div className="ticket-type economy ticket-type">
          <div className="label">PHỔ THÔNG</div>
          <div className="price">từ {formatNumber(flight.economy_pricing)} VND</div>
          {flight.remain_economy_seat > 0 && (
            <div className="seats-left">
              {flight.remain_economy_seat} ghế còn lại
            </div>
          )}
        </div>
        <div className="ticket-type business">
          <div className="label">THƯƠNG GIA</div>
          <div className="price">từ {formatNumber(flight.business_pricing)} VND</div>
          {flight.remain_business_seat > 0 && (
            <div className="seats-left">
              {flight.remain_business_seat} ghế còn lại
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightItem;
