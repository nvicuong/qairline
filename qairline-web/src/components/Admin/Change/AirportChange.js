import React, { useState, useEffect, useRef } from "react";
import { flightData } from "../../../Data/Data";
import FlightList from "./FixTime/FlightList";
import SearchFlightByInfo from "./FixTime/SearchFlightByInfo";
import "./AirportChange.scss";
import axios from "axios";
import API_BASE_URL from "../../../config";
const AirportChange = () => {
  const [searchParams, setSearchParams] = useState({ from: "", to: "" });
  const [flights, setFlights] = useState(null);
  useEffect(() => {}, [flights]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/flights/getAll`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const rows = response.data.result;
        rows.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        const current = rows;
        setFlights(current);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (searchParams) => {
    setSearchParams(searchParams);
  };

  return (
    <div className="container-fluid flight-change">
      {flights ? (
        <>
          <h1>Thông tin chuyến bay</h1>
          <SearchFlightByInfo onSearch={handleSearch} />
          <div style={{ marginTop: "2rem" }}></div>
          <FlightList flights={flights} search={searchParams} />
        </>
      ) : (
        <p>Đang tải dữ liệu...</p> // Hiển thị khi flights chưa có dữ liệu
      )}
    </div>
  );
};

export default AirportChange;
