import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AircraftForm.scss";
import { type } from "@testing-library/user-event/dist/type";
import API_BASE_URL from "../../../../config";

const AircraftForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    code: "",
    manufacturer: "",
    businessSeats: "",
    economySeats: "",
    type: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    setPostMethod(true);
  };

  const [postMethod, setPostMethod] = useState(false);

  useEffect(() => {
    if (!postMethod) return;

    const data = {
      name: formData.name,
      manufacturer: formData.manufacturer,
      registration_code: formData.code,
      aircraft_type: formData.type,
      year_of_manufacture: formData.year,
      economy_seat: formData.economySeats,
      business_seat: formData.businessSeats,
    };

    const postData = async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/aircraft/create`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        alert("Tạo thành công");
        setFormData({
          name: "",
          year: "",
          code: "",
          manufacturer: "",
          businessSeats: "",
          economySeats: "",
          type: "",
        });
      } catch (error) {
        alert("Tạo thất bại");
        console.error("Error occurred while posting data:", error);
        if (error.response) {
          console.error("Server responded with:", error.response.data);
        } else if (error.request) {
          console.error("No response received from server:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
      } finally {
        setPostMethod(false);
      }
    };

    postData();
  }, [postMethod, formData]);

  return (
    <div className="aircraft-form-custom">
      <h1>Thêm tàu bay</h1>

      <form className="aircraft-form-custom" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên máy bay:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Nhập tên máy bay"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Loại máy bay:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            placeholder="Nhập loại máy bay"
            required
          />
        </div>

        <div className="split-group">
          <div className="split-form-item form-group">
            <label htmlFor="code">Mã máy bay:</label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              placeholder="Nhập mã máy bay"
              required
            />
          </div>

          <div className="split-form-item form-group">
            <label htmlFor="year">Năm sản xuất:</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              placeholder="Nhập năm sản xuất"
              min="1900"
              max={new Date().getFullYear()}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="manufacturer">Nhà sản xuất:</label>
          <input
            type="text"
            id="manufacturer"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleInputChange}
            placeholder="Nhập nhà sản xuất"
            required
          />
        </div>

        <div className="split-group">
          <div className="split-form-item form-group">
            <label htmlFor="businessSeats">Số ghế thương gia:</label>
            <input
              type="number"
              id="businessSeats"
              name="businessSeats"
              value={formData.businessSeats}
              onChange={handleInputChange}
              placeholder="Nhập số ghế thương gia"
              min="0"
              required
            />
          </div>

          <div className="split-form-item form-group">
            <label htmlFor="economySeats">Số ghế phổ thông:</label>
            <input
              type="number"
              id="economySeats"
              name="economySeats"
              value={formData.economySeats}
              onChange={handleInputChange}
              placeholder="Nhập số ghế phổ thông"
              min="0"
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-button purple-button float-end">
          Lưu thông tin
        </button>
      </form>
    </div>
  );
};

export default AircraftForm;
