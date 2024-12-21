import { Link, useNavigate, useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./Header.scss";
import logo from "../../assets/images/logo.svg";
import white_logo from "../../assets/images/logo_white.svg";
import React, { useState, useEffect } from "react";
import API_BASE_URL from "../../config";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [scrolled, setScrolled] = useState(location.pathname !== "/");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const data = {
    from: "",
    to: "",
    date: "",
    search: false,
  };
  const changeP = () => {
    navigate("/flights", {
      state: { data: data },
    });
  };
  // Hook để theo dõi sự kiện cuộn trang

  useEffect(() => {
    const loading = () => {
      const storedLoginStatus = localStorage.getItem("isLoggedIn");
      if (storedLoginStatus === "true") {
        setIsLoggedIn(true);
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    loading();

    // Chỉ thêm sự kiện cuộn khi ở trang chủ
    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
    }

    // Dọn dẹp sự kiện cuộn khi rời khỏi component
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const toggleMenu = () => {
    if (isLoginOpen) {
      setIsLoginOpen(false);
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLogin = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    setIsLoginOpen(!isLoginOpen);
  };

  const handleLogout = () => {
    fetch(`${API_BASE_URL}/accounts/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },

      body: JSON.stringify({
        token: localStorage.getItem("token"),
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Response body:", data);

        // This code is a commitment between BE and FE
        if (data.code !== 1000) {
          throw new Error(data.message);
        }
        localStorage.setItem("isLoggedIn", "false");
        setIsLoggedIn(false);
        navigate("/");
      })
      .catch((error) => {});
  };
  return (
    <>
      <div
        className={
          scrolled ? "scrolled header-container " : "header-container "
        }
      >
        <header className="container">
          <img
            className="header-logo cursor"
            src={scrolled ? white_logo : logo}
            alt=""
            onClick={() => navigate("/")}
          />
          <div className="header-icons">
            <button className="user-icon" onClick={toggleLogin}>
              <i className="fas fa-user"></i>{" "}
            </button>
            <button className="menu-toggle" onClick={toggleMenu}>
              ☰
            </button>
          </div>
          <div className={`header-navigator ${isMenuOpen ? "show" : ""}`}>
            <Link
              to={"/"}
              className="header-navigator-element d-flex justify-content-center align-items-center"
            >
              Trang chủ
            </Link>
            <Link
              to={"/destinations"}
              className="header-navigator-element d-flex justify-content-center align-items-center"
            >
              Khám phá
            </Link>

            <a
              style={{ cursor: "pointer" }}
              onClick={() => changeP()}
              className="header-navigator-element d-flex justify-content-center align-items-center"
            >
              Đặt vé
            </a>

            <Link
              to={"/about-us"}
              className="header-navigator-element d-flex justify-content-center align-items-center"
            >
              Giới thiệu
            </Link>

            <Link
              to={"/help"}
              className="header-navigator-element d-flex justify-content-center align-items-center"
            >
              Trợ giúp
            </Link>
          </div>

          <div className={`header-login-logout ${isLoginOpen ? "show" : ""}`}>
            {isLoggedIn ? (
              <div className="user-info">
                <div
                  className="header-login header-navigator-element hover-item"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Link to="/users" className="dropdown-item">
                    {localStorage.getItem("name")}
                  </Link>
                  <div
                    className="account-menu"
                    style={{ display: isHovered ? "block" : "none" }}
                  >
                    <ul>
                      <li>
                        <Link to="/users" className="dropdown-item">
                          Thông tin cá nhân
                        </Link>
                      </li>
                      <li>
                        <Link to="/users/tracking" className="dropdown-item">
                          Theo dõi chuyến bay
                        </Link>
                      </li>
                      <li>
                        <Link to="/users/orders" className="dropdown-item">
                          Lịch sử đặt vé
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/users/changepassword"
                          className="dropdown-item"
                        >
                          Thay đổi mật khẩu
                        </Link>
                      </li>
                      <li className="logout-li">
                        <button to="/login" onClick={handleLogout}>
                          Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="header-login-logout">
                <Link
                  className="header-login header-navigator-element"
                  to="/login"
                >
                  ĐĂNG NHẬP
                </Link>
                <span className="separator"></span>
                <Link className="header-navigator-element" to="/register">
                  ĐĂNG KÝ
                </Link>
              </div>
            )}
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
