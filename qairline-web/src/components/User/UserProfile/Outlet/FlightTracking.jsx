import React, { useEffect, useState } from "react";
import "./FlightTracking.scss";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../../config";


const FlightTracking = () => {
    const userInfo = useOutletContext();
    console.log("User:", userInfo);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [deleteFlight, setDeleteFlight] = useState(null);
    const itemsPerPage = 5;
    const [orders, setOrders] = useState([]);
    const formatNumber = (num) => {
        return num.toLocaleString('vi-VN');
      };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/flights/future/${userInfo.id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const filteredData = response.data.result.sort((a, b) => {
                    return new Date(b.departure_time_book) - new Date(a.departure_time_book);
                });
                setOrders(filteredData);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchData();
    }, []);


    const formatDateTime = (isoDate) => {
        const date = new Date(isoDate);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
        const year = date.getFullYear();

        return `${hours}:${minutes}\n ${day}-${month}-${year}`;
    };
    const isMoreThanFiveHours = (date1, date2) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);

        const diffInMilliseconds = Math.abs(d1 - d2);

        const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

        return diffInHours > 5;
    };

    const deleleItem = (order) => {
        const newOrders = orders.filter((item) => item.booking_id !== order.booking_id);
        setOrders(newOrders);
        deleteApi(order.booking_id);
        setDeleteFlight(null);
        setSelectedBooking(null)
        alert("Hủy vé thành công");
    }
    const deleteApi = async (order) => {
        try {
            await axios.delete(`${API_BASE_URL}/bookings/delete/${order}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

        } catch (err) {
            console.error("Failed to delete user:", err);
        }
    };

    // Phân trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(orders.length / itemsPerPage);

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
                Theo dõi chuyến bay đang đặt
                <span className="order-count">Số đơn đặt: {orders.length}</span>
            </h2>
            <hr />
            <div className="tableContainer">
                <table className="transactionTable">
                    <thead>
                        <tr>
                            <th className="text-end">Id</th>
                            <th className="text-end">Ngày đặt</th>
                            <th className="text-end">Điểm đi</th>
                            <th className="text-end">Điểm đến</th>
                            <th className="text-end">Ngày đi</th>
                            <th className="text-end">Số vé</th>
                            <th className="text-end">Số tiền</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((order, index) => (
                            <tr key={index}>
                                <td data-label="Flight ID" className="text-end">{order.booking_id}</td>
                                <td data-label="Ngày đặt" className="text-end">{formatDateTime(order.departure_time_book)}</td>
                                <td data-label="Điểm đi" className="text-end">{order.from}</td>
                                <td data-label="Điểm đến" className="text-end">{order.to}</td>
                                <td data-label="Ngày đi" className="text-end">{formatDateTime(order.departure_time_fly)}</td>
                                <td data-label="Số vé" className="text-end">{order.num_tickets}</td>
                                <td data-label="Số tiền" className="text-end">{order.price.toLocaleString('vi-VN')} <strong>đ</strong></td>
                                <td className="text-end">
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
                        <span className="">{i + 1}</span>
                    </button>
                ))}
                <button
                    className={`next-button ${currentPage === totalPages ? "disabled" : ""
                        }`}
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
                            <b>Giá vé:</b> {selectedBooking.price.toLocaleString('vi-VN')} VND
                        </p>
                        <p>
                            <b>Loại vé:</b> {selectedBooking.num_ticket_economy !== 0 ? "Phổ thông" : "Thương gia"}
                        </p>
                        {isMoreThanFiveHours(
                            new Date().toISOString().slice(0, 19),
                            selectedBooking.departure_time_fly
                        ) ? (
                            <button className="delete-button" onClick={
                                () => setDeleteFlight(selectedBooking)
                            }>Hủy vé</button>
                        ) : (
                            <span>Hết hạn hủy</span>
                        )}
                        <button className="closed-button" onClick={() => setSelectedBooking(null)}>Đóng</button>
                    </div>
                </div>
            )}
            {deleteFlight && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Bạn có chắc muốn hủy vé không</h3>
                        <div className="modal-button">
                            <button className="confirmDeleteButton" onClick={() => deleleItem(deleteFlight)}>Có</button>
                            <button className="notConfirmDeleteButton purple-button" onClick={() => setDeleteFlight(null)}>Không</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FlightTracking;
