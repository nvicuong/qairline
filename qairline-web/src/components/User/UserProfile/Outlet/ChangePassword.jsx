import React, { useState } from "react";
import "./ChangePassword.scss";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../../config";

const ChangePassword = () => {
  const userInfo = useOutletContext();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await axios.put(
          `${API_BASE_URL}/accounts/change/${userInfo.id}`,
          {
            old_password: currentPassword,
            new_password: confirmPassword
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        alert("Cập nhật mật khẩu thành công");
      } catch (error) {
        alert("Cập nhật mật khẩu thất bại do mật khẩu ko đúng");
        console.error("Error:", error);
      }
      finally {
      }
    }
    fetchData();
    setConfirmPassword("");
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <div className="change-password-custom">
      <h2 className="header">Đổi Mật Khẩu Tài Khoản</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="currentPassword">Mật khẩu hiện tại:</label>
          <input
            className="styled-input"
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">Mật khẩu mới:</label>
          <input
            className="styled-input"
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Xác nhận mật khẩu mới:</label>
          <input
            className="styled-input"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-submit purple-button">
          Đổi mật khẩu
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;