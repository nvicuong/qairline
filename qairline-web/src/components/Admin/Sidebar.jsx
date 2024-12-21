import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import Logo from "../../assets/images/logo_white.svg";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();
  const [expanded, setExpaned] = useState(true)

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  return (
    <>
      {/* <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div> */}
    <div className="sidebar">
  {/* Logo */}
  <div className="logo" onClick={() => navigate("/")}>
    <img src={Logo} alt="logo" />
  </div>

  {/* Menu */}
  <div className="menu">
    <ul>
      {SidebarData.map((item, index) => (
        <li
          key={index}
          className={`menuItem ${selected === index ? "active" : ""}`}
          onClick={() => {
            setSelected(index);
            navigate(item.link);
          }}
        >
          <item.icon className="sidebar-icon" color={selected === index ? "#720455" : "#fff"} />
          <span>{item.heading}</span>
        </li>
      ))}
    </ul>
  </div>
</div>

    </>
  );
};

export default Sidebar;
