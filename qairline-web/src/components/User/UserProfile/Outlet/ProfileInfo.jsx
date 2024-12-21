import React, { useState } from "react";
import "./ProfileInfo.scss";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../../config";

const ProfileInfo = () => {
  const userInfo = useOutletContext();
  const [user, setUser] = useState(userInfo);
  const [isEditing, setIsEditing] = useState(false);
  console.log("User:", user);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${API_BASE_URL}/accounts/update/${userInfo.id}`,
        {
          full_name: user.full_name === "" ? null : user.full_name,
          address: user.address === "" ? null : user.address,
          email: user.email === "" ? null : user.email,
          phone_number: user.phone_number === "" ? null : user.phone_number,
          gender: user.gender === "" ? null : user.gender,
          birthday: user.birthday === "" ? null : user.birthday,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Cập nhật thông tin thành công");
    } catch (error) {
      alert("Cập nhật thông tin thất bại. Bạn chưa đủ 18 tuổi.");
      console.error("Error:", error);
    }
    finally {
      setIsEditing(false);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  return (
    <div className="profile-custom">
      <h2 className="header">
        Thông tin cá nhân
      </h2>
      <hr />
      <div className="info-container">
        <div className="info-row">
          <span className="field-title">Username:</span>
          <span>{user.username}</span>
        </div>
        <div className="info-row">
          <span className="field-title">Họ và tên:</span>
          {isEditing ? (
            <input
              className="styled-input"
              type="text"
              name="full_name"
              value={user.full_name}
              onChange={handleChange}
            />
          ) : (
            <span>{user.full_name}</span>
          )}
        </div>
        <div className="info-row">
          <span className="field-title">Ngày sinh:</span>
          {isEditing ? (
            <input
              className="styled-input"
              type="date"
              name="birthday"
              value={user.birthDay}
              onChange={handleChange}
            />
          ) : (
            <span>{user.birthday !== null ? user.birthday : "Chưa cập nhật"}</span>
          )}
        </div>
        <div className="info-row">
          <span className="field-title">Giới tính:</span>
          {isEditing ? (
            <input
              className="styled-input"
              type="text"
              name="gender"
              value={user.gender}
              onChange={handleChange}
            />
          ) : (
            <span>{user.gender !== null ? user.gender : "Chưa cập nhật"}</span>
          )}
        </div>
        <div className="info-row">
          <span className="field-title">Địa chỉ:</span>
          {isEditing ? (
            <input
              className="styled-input"
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
            />
          ) : (
            <span>{user.address !== null ? user.address : "Chưa cập nhật"}</span>
          )}
        </div>
        <div className="info-row">
          <span className="field-title">Số điện thoại:</span>
          {isEditing ? (
            <input
              className="styled-input"
              type="text"
              name="phone_number"
              value={user.phone_number}
              onChange={handleChange}
            />
          ) : (
            <span>{user.phone_number !== null ? user.phone_number : "Chưa cập nhật"}</span>
          )}
        </div>
        <div className="info-row">
          <span className="field-title">Email:</span>
          {isEditing ? (
            <input
              className="styled-input"
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          ) : (
            <span>{user.email !== null ? user.email : "Chưa cập nhật"}</span>
          )}
        </div>
        <div className="update-info">
          {isEditing && <button className="purple-button float-end" onClick={() => handleSave()}>Lưu</button>}
          <button className="purple-button float-end" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Hủy" : "Cập nhật thông tin"}
          </button>

        </div>

        </div>
    </div>
  )
};

export default ProfileInfo;