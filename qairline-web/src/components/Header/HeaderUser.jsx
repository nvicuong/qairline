import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink, useNavigate } from "react-router-dom";
import background from "../../assets/images/aircraft_background.jpg";
import Quote from "../Home/Quote";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./HeaderUser.scss";
import logo from "../../assets/images/logo.svg";
import white_logo from "../../assets/images/logo_white.svg";
import React, { useState, useEffect } from "react";

const HeaderUser = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  // Hook để theo dõi sự kiện cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true); // Thêm trạng thái khi cuộn xuống
      } else {
        setScrolled(false); // Trạng thái khi ở trên đầu trang
      }
    };

    window.addEventListener("scroll", handleScroll); // Lắng nghe sự kiện cuộn trang

    // Dọn dẹp khi component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
  return (
    <>
      <div
        div
        className={
          scrolled ? "scrolled header-container " : "header-container "
        }
      >
        <header>
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
            <a className="header-navigator-element" href="#">
              Khám phá
            </a>
            <a className="header-navigator-element" href="#">
              Giới thiệu
            </a>
            <a className="header-navigator-element" href="#">
              Đặt vé
            </a>
            <a className="header-navigator-element" href="#">
              Trợ giúp
            </a>
          </div>
          <div className={`header-login-logout ${isLoginOpen ? "show" : ""}`}>
            <Link className="header-login header-navigator-element" to="/login">
              ĐĂNG NHẬP
            </Link>
            <Link className="header-navigator-element" to="/register">
              ĐĂNG KÝ
            </Link>
          </div>
        </header>
      </div>
    </>
  );
};

export default HeaderUser;
