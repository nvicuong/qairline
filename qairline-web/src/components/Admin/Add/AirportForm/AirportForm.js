import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AirportForm.scss";
import AirportDropdown from "../../../Home/AirportDropdown";
import { airportNames } from "../../../../Data/Data";
import API_BASE_URL from "../../../../config";

const AirportForm = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    airplaneName: "",
    ticketEconomyNumber: "",
    ticketBusinessNumber: "",
    priceEconomy: "",
    priceBusiness: "",
  });

  const [dataAirports, setDataAirports] = useState([]);
  const [dataAircraft, setDataAircraft] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch airports and aircraft data
  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/airports/getAll`);
        setDataAirports(response.data?.result || []);
      } catch (error) {
        console.error("Error fetching airports:", error);
      }
    };

    const fetchAircraft = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/aircraft/getAll`);
        setDataAircraft(response.data?.result || []);
      } catch (error) {
        console.error("Error fetching aircraft:", error);
      }
    };

    fetchAirports();
    fetchAircraft();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDropdownChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value.name }));
  };

  const formatDateTime = (date) => {
    return date ? `${date}:00` : "";
  };

  const getCurrentTime = () => {
    const now = new Date();
    const utcPlus7 = new Date(now.getTime() + 7 * 60 * 60 * 1000);
    return utcPlus7.toISOString().slice(0, 19);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      airplane_name: formData.airplaneName,
      remain_economy_seat: formData.ticketEconomyNumber,
      remain_business_seat: formData.ticketBusinessNumber,
      departure_time: formatDateTime(formData.departureDate),
      arrival_time: formatDateTime(formData.returnDate),
      departure_airport: formData.from,
      arrival_airport: formData.to,
      economy_pricing: formData.priceEconomy,
      business_pricing: formData.priceBusiness,
      created_at: getCurrentTime(),
      updated_at: getCurrentTime(),
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/flights/create`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("Tạo chuyến bay thành công");
    } catch (error) {
      console.error("Error occurred while creating flight:", error);
      alert("Tạo chuyến bay thất bại");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-add-custom">
      <h1>Thêm chuyến bay</h1>
      <form id="form-add" onSubmit={handleSubmit}>
        {/* Departure and Arrival Airports */}
        <div className="form-add-address">
          <div className="form-add-airport">
            <label htmlFor="from">Nơi đi:</label>
            <AirportDropdown
              airports={dataAirports.length ? dataAirports : airportNames}
              placeholder="Từ"
              type="from"
              onValueChange={(value) => handleDropdownChange("from", value)}
              required
            />
          </div>
          <div className="form-add-airport">
            <label htmlFor="to">Nơi đến:</label>
            <AirportDropdown
              airports={dataAirports.length ? dataAirports : airportNames}
              placeholder="Đến"
              type="to"
              onValueChange={(value) => handleDropdownChange("to", value)}
              required
            />
          </div>
        </div>

        {/* Departure and Arrival Dates */}
        <div className="form-add-day">
          <div className="form-add-day-item form-custom">
            <label htmlFor="departureDate">Ngày đi:</label>
            <input
              type="datetime-local"
              id="departureDate"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-add-day-item form-custom">
            <label htmlFor="returnDate">Giờ đến:</label>
            <input
              type="datetime-local"
              id="returnDate"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Aircraft Selection */}
        <div className="form-airplane form-custom">
          <label htmlFor="airplaneName">Tên máy bay:</label>
          <AirportDropdown
            airports={dataAircraft}
            placeholder="Chọn máy bay"
            type="airplaneName"
            onValueChange={(value) =>
              handleDropdownChange("airplaneName", value)
            }
            required
          />
        </div>

        {/* Ticket Numbers and Pricing */}
        <div className="form-add-ticket">
          <div className="form-custom">
            <label htmlFor="ticketEconomyNumber">Số vé phổ thông:</label>
            <input
              type="number"
              id="ticketEconomyNumber"
              name="ticketEconomyNumber"
              value={formData.ticketEconomyNumber}
              onChange={handleInputChange}
              placeholder="Nhập số vé"
              required
            />
          </div>
          <div className="form-custom">
            <label htmlFor="ticketBusinessNumber">Số vé thương gia:</label>
            <input
              type="number"
              id="ticketBusinessNumber"
              name="ticketBusinessNumber"
              value={formData.ticketBusinessNumber}
              onChange={handleInputChange}
              placeholder="Nhập số vé"
              required
            />
          </div>
        </div>

        <div className="form-add-ticket">
          <div className="form-custom">
            <label htmlFor="priceEconomy">Giá vé phổ thông:</label>
            <input
              type="number"
              id="priceEconomy"
              name="priceEconomy"
              value={formData.priceEconomy}
              onChange={handleInputChange}
              placeholder="Nhập giá vé"
              required
            />
          </div>
          <div className="form-custom">
            <label htmlFor="priceBusiness">Giá vé thương gia:</label>
            <input
              type="number"
              id="priceBusiness"
              name="priceBusiness"
              value={formData.priceBusiness}
              onChange={handleInputChange}
              placeholder="Nhập giá vé"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          className="form-submit purple-button float-end"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang xử lý..." : "Gửi thông tin"}
        </button>
      </form>
    </div>
  );
};

export default AirportForm;
