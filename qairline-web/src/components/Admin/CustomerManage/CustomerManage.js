import React, { useEffect, useState } from "react";
import CustomerList from "./CustomerList/ CustomerList";
import { bookings } from "../../../Data/Data";
import axios from "axios";
import { dividerClasses } from "@mui/material";
import API_BASE_URL from "../../../config";
const CustomerManage = () => {
  const [dataUser, setDataUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/accounts`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setDataUser(response.data.result);
        console.log("Data:", response.data);
        console.log("Data User:", dataUser);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  return <div>{dataUser && <CustomerList rootBookings={dataUser} />}</div>;
};

export default CustomerManage;
