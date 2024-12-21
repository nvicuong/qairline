import React from "react";
import "./SidebarUser.scss";
import { Link, useLocation } from "react-router-dom";

const SidebarUser = () => {
  const location = useLocation(); // Lấy thông tin đường dẫn hiện tại

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar-user-custom">
      <ul>
        <li>
          <Link
            className={`side-item ${isActive("/users") ? "active" : ""}`}
            to="/users"
          >
            <i className="icon-user"></i>
            Thông tin tài khoản
            <span>Quản lí thông tin cá nhân</span>
          </Link>
        </li>
        <li>
          <Link
            className={`side-item ${isActive("/users/tracking") ? "active" : ""}`}
            to="/users/tracking"
          >
            <i className="icon-wallet"></i>
            Theo dõi các chuyến bay
            <span>Quản lí các chuyến bay đã đặt</span>
          </Link>
        </li>
        <li>
          <Link
            className={`side-item ${isActive("/users/orders") ? "active" : ""}`}
            to="/users/orders"
          >
            <i className="icon-cart"></i>
            Lịch sử đơn hàng
            <span>Thông tin vé đã đặt thành công</span>
          </Link>
        </li>
        <li>
          <Link
            className={`side-item ${isActive("/users/changepassword") ? "active" : ""}`}
            to="/users/changepassword"
          >
            <i className="icon-lock"></i>
            Thay đổi mật khẩu
            <span>Cập nhật mật khẩu mới</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarUser;
