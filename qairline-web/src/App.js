import "./App.scss";
import Header from "./components/Header/Header";
import { Link, Outlet } from "react-router-dom";
import background from "./assets/images/background.png";
import HomePage from "./components/Home/HomePage";
import Footer from "./components/Footer/Footer";
import React, { useEffect } from "react";
// import "./custom-bootstrap.scss";

const App = () => {
  return (
    <div className="app-container">
      {/* <div className="header-container"> */}
      <Header />
      {/* </div> */}
      <div className="main-container">
        {/* <HomePage /> */}
        <Outlet />
      </div>
      <div className="footer-container">
        <Footer />
      </div>
      {/* <div className="main-container">
        <div className="sidebar-container"></div>
        <div className="content-container">
          <Outlet />
        </div>
      </div> */}
    </div>
  );
};

export default App;
