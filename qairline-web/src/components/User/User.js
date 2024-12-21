import React, { useEffect, useState } from "react";
import "./User.scss";
import HeaderUser from "../Header/HeaderUser";
import CardProfile from "./UserProfile/CardProfile";
import SidebarUser from "./UserProfile/SidebarUser";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import axios from "axios";
import API_BASE_URL from "../../config";
const User = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/accounts/myInfo`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const userDatas = response.data.result;
        setUserData(userDatas);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Header />
      {userData && <CardProfile users={userData} />}
      <div className="profile-body-custom">
        <SidebarUser />
        {userData && <Outlet context={userData} />}
      </div>
      <Footer />
    </div>
  );
};

export default User;
