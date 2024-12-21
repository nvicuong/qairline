import FlightSearchItem from "./FlightSearchItem";
import "./FlightSearchList.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../config";

const FlightSearchList = ({ title, data, post }) => {
  const [userData, setUserData] = useState({});
  const [dataFlight, setDataFlight] = useState({
    from: "",
    to: "",
    class: "Phổ thông",
    price: 0,
    adult: 0,
    children: 0,
    flight_id: "",
  });
  const navigate = useNavigate();
  const formatNumber = (num) => {
    return num.toLocaleString("vi-VN");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/accounts/myInfo`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const userDatas = response.data.result;
        setUserData(userDatas);

        console.log("User", response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);
  const onShowDetail = (flight, type) => {
    setShowDetail(true);
    console.log("Flight1:", flight);
    setDataFlight({
      ...dataFlight,
      from: flight.departureAirport.city,
      to: flight.arrivalAirport.city,
      class: type === "economy" ? "Phổ thông" : "Thương gia",
      price:
        type === "economy" ? flight.economy_pricing : flight.business_pricing,
      adult: 1,
      children: 0,
      flight_id: flight.flight_id,
    });
  };
  const getTime = () => {
    const currentDate = new Date();
    const utcPlus7 = new Date(currentDate.getTime() + 7 * 60 * 60 * 1000);
    const formattedDate = utcPlus7.toISOString().slice(0, 19);
    return formattedDate;
  };
  const [showDetail, setShowDetail] = useState(false);
  const handleConfirmBooking = () => {
    const data = {
      user_id: userData.id,
      flight_id: dataFlight.flight_id,
      num_ticket_adult: dataFlight.adult,
      num_ticket_child: dataFlight.children,
      price: parseFloat(dataFlight.price),
      style_class: dataFlight.class === "Phổ thông" ? "economy" : "business",
      created_at: getTime(),
      updated_at: getTime(),
    };
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/bookings/create`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const userConfirmed = await window.confirm(
          "Đặt vé thành công\n" + "Bạn có muốn chuyển trang thông tin không?"
        );
        if (userConfirmed) {
          navigate("/users/tracking");
        }
      } catch (error) {
        alert("Đặt vé thất bại");
        console.error("Error:", error);
      }
    };
    fetchData();
    setShowDetail(false);
  };
  const handleCloseModal = () => {
    setShowDetail(false);
  };
  return (
    <div className="flight-container">
      <div className="date-header">
        <h2 className="flight-day">{title}</h2>
      </div>
      <div>
        {data ? (
          data.map((flight, index) => {
            return (
              <FlightSearchItem
                key={index}
                flight={flight}
                onShowDetails={onShowDetail}
              />
            );
          })
        ) : (
          <p>Không có chuyến bay nào</p>
        )}
      </div>
      <div>
        {showDetail && (
          <div className="modal-overlay-custom">
            <div className="modal-content">
              <h2>Xác nhận đặt vé</h2>
              <p>Bạn có chắc chắn muốn đặt vé này?</p>

              <div className="ticket-details">
                <p>
                  <strong>Hành trình:</strong>{" "}
                  <strong>{dataFlight.from}</strong> đến{" "}
                  <strong>{dataFlight.to}</strong>
                </p>
                <p>
                  <strong>Hạng vé:</strong> {dataFlight.class}
                </p>
                <p>
                  <strong>Giá vé cơ bản:</strong>{" "}
                  {formatNumber(dataFlight.price)} VND
                </p>

                <div className="quantity-section">
                  <p>
                    <strong>Số vé người lớn:</strong>
                    <button
                      className="btn-decrease"
                      onClick={() =>
                        setDataFlight((prev) => ({
                          ...prev,
                          adult: prev.adult > 0 ? prev.adult - 1 : 0,
                        }))
                      }
                    >
                      -
                    </button>
                    <span>{dataFlight.adult}</span>
                    <button
                      className="btn-increase"
                      onClick={() =>
                        setDataFlight((prev) => ({
                          ...prev,
                          adult: prev.adult + 1,
                        }))
                      }
                    >
                      +
                    </button>
                  </p>

                  <p>
                    <strong>Số vé trẻ em:</strong>
                    <button
                      className="btn-decrease"
                      onClick={() =>
                        setDataFlight((prev) => ({
                          ...prev,
                          children: prev.children > 0 ? prev.children - 1 : 0,
                        }))
                      }
                    >
                      -
                    </button>
                    <span>{dataFlight.children}</span>
                    <button
                      className="btn-increase"
                      onClick={() =>
                        setDataFlight((prev) => ({
                          ...prev,
                          children: prev.children + 1,
                        }))
                      }
                    >
                      +
                    </button>
                  </p>
                </div>

                <p>
                  <strong>Tổng số tiền:</strong>{" "}
                  {formatNumber(
                    (parseInt(dataFlight.price, 10) / 2) *
                      (dataFlight.adult * 2 + dataFlight.children)
                  )}{" "}
                  VND
                </p>
                <p>
                  <strong>Điều kiện:</strong> Có thể hoàn và thay đổi vé
                </p>
              </div>

              <div className="action-buttons">
                <button
                  className="confirm-button"
                  onClick={handleConfirmBooking}
                >
                  Xác nhận
                </button>
                <button className="cancel-button" onClick={handleCloseModal}>
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default FlightSearchList;
