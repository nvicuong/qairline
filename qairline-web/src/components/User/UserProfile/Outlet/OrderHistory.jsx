import React, { useState, useEffect } from "react";
import "./OrderHistory.scss";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../../config";

const OrderHistory = () => {
  const userInfo = useOutletContext();
  const [filters, setFilters] = useState({
    orderId: "",
    date: "",
  });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]); // Dữ liệu sau khi lọc
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/flights/history/${userInfo.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const orderData = response.data.result;
        setOrders(orderData);
        setFilteredOrders(orderData); // Khởi tạo danh sách hiển thị ban đầu
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [userInfo.id]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filterByDate = () => {
    if (!filters.date) {
      setFilteredOrders(orders); // Không có ngày, hiển thị toàn bộ
      return;
    }
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.departure_time_fly)
        .toISOString()
        .split("T")[0];
      return orderDate === filters.date; // So sánh ngày đặt
    });
    setFilteredOrders(filtered);
    setCurrentPage(1); // Quay về trang đầu tiên sau khi lọc
  };

  const formatDateTime = (isoDate) => {
    const date = new Date(isoDate);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:${minutes}\n ${day}-${month}-${year}`;
  };

  const formatNumber = (num) => {
    return num.toLocaleString("vi-VN");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="order-history-custom">
      <h2 className="header">
        Lịch sử đơn hàng
        <span className="order-count">Số đơn đặt: {filteredOrders.length}</span>
      </h2>
      <hr />
      <div className="filter-container">
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="styled-input"
        />
        <button onClick={filterByDate} className="filter-button purple-button">Lọc</button>
      </div>
      <div className="tableContainer">
        <table className="transactionTable">
          <thead>
            <tr>
              <th>Id</th>
              <th>Ngày đặt</th>
              <th>Chuyến</th>
              <th>Ngày đi</th>
              <th>Số vé</th>
              <th>Số tiền</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order, index) => (
              <tr key={index}>
                <td data-label="Flight ID">{order.booking_id}</td>
                <td data-label="Ngày đặt">{formatDateTime(order.departure_time_book)}</td>
                <td data-label="Chuyến">{order.from}→{order.to}</td>
                <td data-label="Ngày đi">{formatDateTime(order.departure_time_fly)}</td>
                <td data-label="Số vé">{order.num_tickets}</td>
                <td data-label="Số tiền">{formatNumber(order.price)}</td>
                <td data-label="Trạng thái">{order.status === "SUCCESS" ? "Thành công" : "Đã hủy"}</td>
                <td>
                  <button className="detailButton purple-button" onClick={() => setSelectedBooking(order)}>Chi tiết</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Phân trang */}
      <div className="pagination">
        <button
          className={`prev-button ${currentPage === 1 ? "disabled" : ""}`}
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Trước
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className={`next-button ${currentPage === totalPages ? "disabled" : ""}`}
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Tiếp
        </button>
      </div>
      <hr />
      {selectedBooking && (
        <div className="modal">
          <div className="modal-content">
            <h3>Chi tiết đặt vé</h3>
            <p>
              <b>Mã vé:</b> {selectedBooking.flight_code}
            </p>
            <p>
              <b>Ngày đặt:</b> {formatDateTime(selectedBooking.departure_time_book)}
            </p>
            <p>
              <b>Chuyến:</b> {selectedBooking.from} → {selectedBooking.to}
            </p>
            <p>
              <b>Ngày đi:</b> {formatDateTime(selectedBooking.departure_time_fly)}
            </p>
            <p>
              <b>Số vé:</b> {selectedBooking.num_tickets}
            </p>
            <p>
              <b>Người lớn: </b> {selectedBooking.num_ticket_adult}
            </p>
            <p>
              <b>Trẻ em:</b> {selectedBooking.num_ticket_child}
            </p>
            <p>
              <b>Giá vé:</b> {formatNumber(selectedBooking.price)} VND
            </p>
            <p>
              <b>Loại vé:</b> {selectedBooking.num_ticket_economy !== 0 ? "Phổ thông" : "Thương gia"}
            </p>
            <button className="closed-button" onClick={() => setSelectedBooking(null)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
