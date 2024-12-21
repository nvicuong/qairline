import { useEffect, useState } from "react";
import Heading from "../Utils/Heading";
import FlightCard from "./FlightCard";
import "./FlightList.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../config";

const FlightList = () => {
  const [dataFlight, setDataFlight] = useState([]);
  const getDay = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  };
  const navigate = useNavigate();
  useEffect(() => {
    const date = getDay();
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/flights/search6`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const filteredData = response.data.result.elements;
        setDataFlight(filteredData);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flight-list-container container-fluid position-relative">
      <div className="content container">
        <Heading title="Chuyến bay" link="/flights" />

        <div className="flight-card-container row row-cols-xl-3 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 gap-3">
          {dataFlight.length > 0 ? (
            dataFlight.map((flight, index) => (
              <FlightCard key={index} flight={flight} />
            ))
          ) : (
            <p>Không có chuyến bay ngày hôm nay.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightList;
