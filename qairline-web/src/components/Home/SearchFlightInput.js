import "./SearchFlightInput.scss";
import arrow_left_right from "../../assets/images/arrow-left-right.svg";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AirportDropdown from "./AirportDropdown";
import { airportNames, UpdatesData } from "../../Data/Data";
import PassengerSelector from "./PassengerSelector";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";
import { use } from "react";
import API_BASE_URL from "../../config";

const SearchFlightInput = ({ dataFlight, updatesData }) => {
  const [openTab, setOpenTab] = useState(1); // Quản lý trạng thái tab mở
  const toggleTab = (tabIndex) => {
    setOpenTab((prev) => (prev === tabIndex ? null : tabIndex)); // Đóng tab nếu đã mở, ngược lại mở tab
  };
  const location = useLocation();
  const [isVisible, setVisible] = useState(false); // Set trạng thái có sử dụng Ngày về không?
  const [flight, setFlight] = useState({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    passengers: "",
    children: 0,
    adult: 0,
    type: "Một chiều",
    idfrom: 1,
    idto: 2,
    search: false,
  });
  const [airportData, setAirportData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/airports/getAll`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setAirportData(response.data.result);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleNavigate = async (e) => {
    e.preventDefault();
    navigate("/flights", { state: { data: flight } });
    console.log("Flight", flight);
    if (flight.from && flight.to && flight.departureDate) {
      const data = {
        departure_id: flight.idfrom,
        arrival_id: flight.idto,
        departure_date: flight.departureDate,
        return_date: flight.returnDate,
        type: flight.type,
        adult: flight.adult || 0,
        children: flight.children || 0,
      };
      updatesData(data);
    }
  };

  const handleChangeFrom = (value) => {
    setFlight((prev) => {
      return {
        ...prev,
        from: value.name,
        idfrom: value.id,
      };
    });
  };
  const handleChangeTo = (value) => {
    setFlight((prev) => {
      return {
        ...prev,
        to: value.name,
        idto: value.id,
      };
    });
  };

  const handleChangeType = (event) => {
    setFlight((prev) => {
      if (flight.type === "Một chiều") {
        return {
          ...prev,
          type: "Khứ hồi",
        };
      } else {
        return {
          ...prev,
          type: "Một chiều",
        };
      }
    });
    if (flight.type === "Khứ hồi") {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };
  const handleChangeDate = (event) => {
    const day = event.target.value;
    if (event.target.id === "departure-date") {
      setFlight((prev) => {
        return {
          ...prev,
          departureDate: day,
        };
      });
    }
    if (event.target.id === "return-date") {
      setFlight((prev) => {
        return {
          ...prev,
          returnDate: day,
        };
      });
    }
  };

  const onChangePassenger = (value) => {
    setFlight((prev) => {
      return {
        ...prev,
        passengers: value.type,
        children: value.children,
        adult: value.adults,
      };
    });
  };

  const Test = (e) => {
    console.log(flight);
  };

  return (
    <form className="form-search-flight-input" action="#">
      <div className="form-search-properties">
        {/* <div className="form-group">
          <input type="text" id="from" name="from" placeholder="Từ"
            value={flight.from}
            onChange={handleChange} required />
        </div> */}

        <AirportDropdown
          airports={airportData}
          placeholder="Từ"
          type="from"
          onValueChange={handleChangeFrom}
          required={true}
        />
        <img
          className="arrow-left-right"
          src={arrow_left_right}
          alt="arrow_left_right"
        />

        {/* <div className="form-group">
          <input type="text" id="to" name="to" placeholder="Đến"
            value={flight.to}
            onChange={handleChange} required />
        </div> */}
        <AirportDropdown
          airports={airportData}
          placeholder="Đến"
          type="to"
          onValueChange={handleChangeTo}
          required={true}
        />

        <div className="form-group selection-form-group">
          <label htmlFor="departure-date">Ngày đi</label>
          <input
            type="date"
            id="departure-date"
            name="departure-date"
            value={flight.departureDate}
            onChange={handleChangeDate}
            required
          />
        </div>

        <div
          className={`form-group selection-form-group ${
            isVisible ? "" : "nodisplay"
          }`}
        >
          <label htmlFor="return-date">Ngày về</label>
          <input
            type="date"
            id="return-date"
            name="return-date"
            value={flight.returnDate}
            onChange={handleChangeDate}
          />
        </div>

        <div className="form-group selection-form-group justify-content-center d-flex">
          {/* <label htmlFor="passengers">Số lượng / Hạng vé</label>
          <select id="passengers" name="className" required>
            <option value="economy">Phổ thông</option>
            <option value="business">Thương gia</option>
            <option value="first">Hạng nhất</option>
          </select> */}
          <PassengerSelector onChangePassenger={onChangePassenger} />
        </div>
      </div>
      <div className="form-button">
        <div className="type-of-flight">
          <div className="radio-button-container">
            <div className="radio-button">
              <input
                type="radio"
                className="radio-button__input"
                id="radio1"
                name="radio-group"
                defaultChecked={flight.type === "Một chiều"}
                onChange={handleChangeType}
              />
              <label className="radio-button__label" htmlFor="radio1">
                <span className="radio-button__custom"></span>
                Một chiều
              </label>
            </div>
            <div className="radio-button">
              <input
                type="radio"
                className="radio-button__input"
                id="radio2"
                name="radio-group"
                defaultChecked={flight.type === "Khứ hồi"}
                onChange={handleChangeType}
              />
              <label className="radio-button__label" htmlFor="radio2">
                <span className="radio-button__custom"></span>
                Khứ hồi
              </label>
            </div>
          </div>
        </div>
        <button
          className="purple-button"
          type="submit"
          onClick={handleNavigate}
        >
          Tìm Kiếm
        </button>
      </div>
    </form>
  );
};

export default SearchFlightInput;
