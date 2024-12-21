import React, { useState } from "react";
import axios from "axios";
import "./ManageBooking.scss";
import API_BASE_URL from "../../config";

const ManageBooking = () => {
  const [flightId, setFlightId] = useState("");
  const [data, setData] = useState(null); // Use null initially
  const [isForm, setIsForm] = useState(false);
  const [error, setError] = useState(null); // For error handling

  const handleInputChange = (e) => {
    setFlightId(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/flights/searchCode?code=${flightId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data.result);
        setError(null);
      } catch (error) {
        console.error("Error:", error);
        setError("Không tìm thấy thông tin vé. Vui lòng thử lại.");
      }
    };
    fetchData();
    setIsForm(true);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("vi-VN").format(num);
  };

  return (
    <div>
      <form className="form-search-flight-input" onSubmit={handleSubmit}>
        <div className="form-search-properties">
          <div className="form-group">
            <input
              type="text"
              id="flightId"
              name="flight_id"
              value={flightId}
              onChange={handleInputChange}
              placeholder="Mã đặt chỗ/ Số vé điện tử"
              required
            />
          </div>
          <div className="form-group">
            <input type="text" id="lastName" name="lastName" placeholder="Họ" />
          </div>
        </div>
        <div className="form-button d-flex justify-content-end">
          <button className="purple-button" type="submit">
            Tìm Kiếm
          </button>
        </div>
      </form>

      {error && <p className="error-message">{error}</p>}

      {data && (
        <div className="modal-overlay-custom">
          <div className="modal-content">
            <h2>Thông tin về vé</h2>
            <div className="ticket-details">
              <p>
                <strong>Mã vé:</strong> {data.flight_code}
              </p>
              <p>
                <strong>Hành trình:</strong> {data.from} đến {data.to}
              </p>
              <p>
                <strong>Ngày bay:</strong>{" "}
                {data.departure_time.replace("T", " ")}
              </p>
              <p>
                <strong>Số vé phổ thông:</strong> {data.remain_economy_seat}
              </p>
              <p>
                <strong>Số vé thương gia:</strong> {data.remain_business_seat}
              </p>
              <p>
                <strong>Giá vé phổ thông:</strong>{" "}
                {formatNumber(data.economy_pricing)} VND
              </p>
              <p>
                <strong>Giá vé thương gia:</strong>{" "}
                {formatNumber(data.business_pricing)} VND
              </p>
              <button
                className="closed-button"
                style={{ padding: "5px 10px" }}
                onClick={() => setData(null)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooking;
