import React, { useEffect, useState } from "react";
import { formatDateTime } from "../../../utils/funtionUtils";
import "./Table.scss";
import axios from "axios";
import API_BASE_URL from "../../../config";

function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}






export default function BasicTable() {

  const formatNumber = (num) => {
    return num.toLocaleString('vi-VN');
  };
  const [dataBookings, setDataBookings] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/bookings/getAll`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const rows = response.data.result;
        rows.sort((a, b) => new Date(b.update_at) - new Date(a.update_at));
        const current = rows.slice(0, 10);

        setDataBookings(current);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="booking-statistics">
      <div className="booking-list ">
  <h3>Vé đặt gần đây</h3>
  <table>
    <thead>
      <tr>
        <th>Tên người đặt</th>
        <th>Mã máy bay</th>
        <th>Thời gian đặt</th>
        <th>Số lượng vé</th>
        <th>Giá</th>
      </tr>
    </thead>
    <tbody>
      {dataBookings !== null ? (
        dataBookings.map((row, index) => (
          <tr key={index}>
            <td>{row.name}</td>
            <td>{row.flight_code}</td>
            <td>{formatDateTime(row.update_at)}</td>
            <td>{row.num_tickets}</td>
            <td>{formatNumber(row.price)} VND</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" style={{ textAlign: "center" }}>
            Không có dữ liệu
          </td>
        </tr>
      )}
    </tbody>
  </table>
        </div>
</div>

  );
}
