import React, { useState } from "react";
import "./CustomerList.scss";
import axios from "axios";
import API_BASE_URL from "../../../../config";


const CustomerList = ({rootBookings}) => {
  const [bookings, setBookings] = useState(rootBookings);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bookings.slice(indexOfFirstItem, indexOfLastItem);

  const totalBookings = bookings.length;
  const totalRevenue = bookings
    .filter((b) => b.status === "Đã thanh toán")
    .reduce((sum, b) => sum + b.price, 0);
  const paidBookings = bookings.filter(
    (b) => b.status === "Đã thanh toán"
  ).length;

  const handleNextPage = () => {
    if (currentPage < Math.ceil(bookings.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const deleleUser = (order) => {
    const newOrders = bookings.filter((item) => item.id !== order.id);
    deleteUserAPI(order.id);
    console.log("hello");
    setBookings(newOrders);
    setSelectedBooking(null);
}

const deleteUserAPI = async (userId) => {
  try {
    await axios.delete(`${API_BASE_URL}/accounts/delete/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, 
      },
    });
    alert("Xóa người dùng thành công!");

  } catch (err) {
    alert("Xóa người dùng thất bại!");
    console.error("Failed to delete user:", err);
  }
};

  return (
    <div className="booking-statistics container-fluid">
    
    
      {/* Danh sách đặt vé */}
      <div className="booking-list">
        <h1>Danh sách khách hàng</h1>
        <table>
          <thead>
            <tr>
              <th>Tên user</th>
              <th>Tên</th>
              <th>Giới tính</th>
              <th>Ngày sinh</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.username}</td>
                <td>{booking.full_name}</td>
                <td>
                  {booking.gender}
                </td>
                <td>{booking.birthday}</td>
                <td>{booking.email}</td>
                <td>{booking.phone_number}</td>
                <td>
                  <button onClick={() => setSelectedBooking(booking)}>
                    Xóa user
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button className="change-page" onClick={handlePrevPage} disabled={currentPage === 1}>
            Trang trước
          </button>
          <span style={{ margin: "0 10px" }}>
            Trang {currentPage} / {Math.ceil(bookings.length / itemsPerPage)}
          </span>
          <button
          className="change-page"
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(bookings.length / itemsPerPage)}
          >
            Trang sau
          </button>
        </div>
      </div>

      {/* Modal chi tiết */}
      {selectedBooking && (
        <div className="modal">
          <div className="modal-content">
          <h3>Bạn có chắc chắn muốn xóa người dùng này không</h3>
             <div className="modal-button">
                            <button className="delete-button" onClick={() => deleleUser(selectedBooking)}>Có</button>
                            <button className="closed-button" onClick={() => setSelectedBooking(null)}>Không</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
