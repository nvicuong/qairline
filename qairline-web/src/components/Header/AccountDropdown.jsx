import React, { useState } from "react";
import "./AccountDropdown.scss";

const AccountDropdown = ({ name, logout }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <div className="user-list-custom header-login-logout" onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}>
            <p className="header-navigator-element">{name}</p>
            <div className="dropdown-wrapper">
                <div className="account-dropdown-custom" style={{ display: isHovered ? "inline-block" : "none" }}>
                    <div className="account-menu">
                        <ul>
                            <li>Thông tin cá nhân</li>
                            <li>Theo dõi chuyến bay</li>
                            <li>Lịch sử đặt vé</li>
                            <li>Thay đổi mật khẩu</li>
                            <li className="logout-li"><button to="/login"  onClick={logout}>Đăng xuất</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountDropdown;
