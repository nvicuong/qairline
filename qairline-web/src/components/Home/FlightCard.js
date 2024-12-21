import "./FlightCard.scss";
import { useNavigate } from "react-router-dom";
import flight_example from "../../assets/images/flight_example.png";
const FlightCard = ({ flight }) => {
  const navigate = useNavigate();
  const onNavigation = (info) => {
    const data = {
      returnDate: "",
      passengers: "",
      children: "1",
      adult: "0",
      type: "Một chiều",
      idfrom: info.departureAirport.id,
      idto: info.arrivalAirport.id,
      from: info.departureAirport.city,
      to: info.arrivalAirport.city,
      departureDate: info.departure_time.split("T")[0],
    }
    return () => {
      navigate("/flights", { state: { data: data } });
    };
  }
  const getDay = () => {
    return `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
  }
  const formatNumber = (num) => {
    return num.toLocaleString('vi-VN');
  };
  return (
    <div className="flight-card container">
      <div className="flight-image row">
        <img src={flight_example} alt="article-cover" />
      </div>
      <div className="row">
        <div className="flight-info col-6">
          <p className="title">{flight.departureAirport.city}</p>
          <p className="subtitle">Từ</p>
        </div>
        <div className="flight-info col-6 ">
          <p className="subtitle text-end">Đến</p>
          <p className="title text-end">{flight.arrivalAirport.city}</p>
        </div>
        <div className="col-7">
          <p className="price align-right">{formatNumber(flight.economy_pricing)} VND</p>
        </div>
        <div className="col-5">
          <p className="date text-end">
            <br />
            {flight.departure_time.split("T")[0]}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <hr className="divider" />
          <button className="purple-button" onClick={onNavigation(flight)}>Đặt vé ngay</button>
        </div>
      </div>
    </div>
  );
};
export default FlightCard;
