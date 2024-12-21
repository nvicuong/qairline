import React, { useState } from "react";
import "./AddCategory.scss";
import AirportForm from "./AirportForm/AirportForm";
import AircraftForm from "./AircraftForm/AircraftForm";

const AddCategory = () => {
  const [activeButton, setActiveButton] = useState("Button1");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="container-fluid">
      <div className="button-container-custom">
        <button
          className={activeButton === "Button1" ? "active" : ""}
          onClick={() => handleButtonClick("Button1")}
        >
          Thêm chuyến đi
        </button>
        <button
          className={activeButton === "Button2" ? "active" : ""}
          onClick={() => handleButtonClick("Button2")}
        >
          Thêm tàu bay
        </button>
      </div>
      <div className="info-custom">
        {activeButton === "Button1" ? <AirportForm /> : <AircraftForm />}
      </div>
    </div>
  );
};

export default AddCategory;
