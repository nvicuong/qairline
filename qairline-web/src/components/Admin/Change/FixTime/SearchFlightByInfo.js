import React, { useEffect, useState } from "react";
import "./SearchFlightByInfo.scss";
import AirportDropdown from "../../../Home/AirportDropdown";
import axios from "axios";
import API_BASE_URL from "../../../../config";
const SearchFlightByInfo = ({ onSearch }) => {
  const [dataAirports, setDataAirports] = useState([]);
  const [searchParams, setSearchParams] = useState({ from: "", to: "" });

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/airports/getAll`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.data?.result) {
          setDataAirports(response.data.result);
        } else {
          console.error("Không tìm thấy danh sách sân bay hợp lệ.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sân bay:", error);
      }
    };

    fetchAirports();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleDropdownChange = (field, value) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      [field]: value.name,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search params:", searchParams);
    onSearch(searchParams);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="search-flight-by-info form-group d-flex align-items-center gap-2"
    >
      <label>
        Điểm đi:
        <AirportDropdown
          airports={dataAirports}
          placeholder="Chọn điểm đi"
          value={searchParams.from}
          onValueChange={(value) => handleDropdownChange("from", value)}
        />
      </label>
      <label>
        Điểm đến:
        <AirportDropdown
          airports={dataAirports}
          placeholder="Chọn điểm đến"
          value={searchParams.to}
          onValueChange={(value) => handleDropdownChange("to", value)}
        />
      </label>
      <button type="submit" className="purple-button">
        Tìm kiếm
      </button>
    </form>
  );
};

export default SearchFlightByInfo;
