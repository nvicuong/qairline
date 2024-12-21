import "./FlightSearchPage.scss";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Heading from "../Utils/Heading";
import NavigatorPath from "../Utils/NavigatorPath";
import SearchTab from "../Home/SearchTab";
import FlightSearchList from "./FlightSearchList";
import axios from "axios";
import API_BASE_URL from "../../config";
const FlightSearchPage = () => {
  const navigatorPath = [
    { title: "Trang chủ", link: "/" },
    { title: "Chuyến bay", link: "/flights" },
  ];
  const [flightData, setFlightData] = useState(null);
  const [postData, setPostData] = useState(null);

  const location = useLocation();
  const data = location.state?.data || "No data passed";
  const searchTabRef = useRef(null);
  const replaceSpace = (str) => {
    return str.replace(/ /g, "%20");
    console.log("Replace", "Nghệ An".replace(/ /g, "%20"));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/flights?departure_airport_id=${data.idfrom}&arrival_airport_id=${data.idto}&departure_time=${data.departureDate}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setFlightData(response.data.result.elements);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    const fetchData2 = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/flights?departure_airport_id=${data.idto}&arrival_airport_id=${data.idfrom}&departure_time=${data.returnDate}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data2 = response.data.result.elements;
        setFlightData((prev) => {
          return [...prev, ...data2];
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };
    const fetchData3 = async () => {
      const replace = replaceSpace(data.to);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/flights/find?city=${replace}
`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setFlightData(response.data.result.elements);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (!data.search) {
      fetchData();
      if (data.returnDate !== "") {
        fetchData2();
      }
    }
    if (data.search) {
      fetchData3();
    }
  }, [data]);
  const updateData = async (data) => {
    setPostData(data);
  };
  const title = data.search
    ? `Chuyến bay đến ${data.to ? "" : data.to} `
    : data.to === ""
    ? "Chưa có chuyến bay nào được tìm kiếm"
    : data.returnDate === ""
    ? `Tìm kiếm chuyến bay từ ${data.from} đến ${data.to} ngày ${data.departureDate}`
    : `Tìm kiếm chuyến bay từ ${data.from} đến ${data.to} ngày ${data.departureDate} và chiều ngược lại ngày ${data.returnDate}`;
  useEffect(() => {
    if (searchTabRef.current) {
      searchTabRef.current.scrollIntoView({ behavior: "smooth" });
      searchTabRef.current.focus();
    }
  }, [location]);
  return (
    <div className="flight-search-container container-fluid">
      <div className="content container">
        <NavigatorPath paths={navigatorPath} />
        <Heading title="Chuyến bay" />
        <SearchTab updateData={updateData} ref={searchTabRef} />
        <div className="search-tab-title"></div>
        <FlightSearchList data={flightData} title={title} post={postData} />
      </div>
    </div>
  );
};
export default FlightSearchPage;
