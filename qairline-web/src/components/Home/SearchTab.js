import "./SearchTab.scss";
import airline_mode from "../../assets/images/airplane-mode.png";
import search_icon from "../../assets/images/search-icon.svg";
import SearchFlightInput from "./SearchFlightInput";
import ManageBooking from "./ManageBooking";
import React, { useState } from "react";
import { UpdatesData } from "../../Data/Data";

const SearchTab = ({ data, updateData }) => {
  const [activeTab, setActiveTab] = useState("tab-1");
  const updatesData = (data) => {
    updateData(data);
  };
  return (
    <div className="wrapper container">
      <div className="seach-tabs">
        <div className="search-tab">
          <input
            type="radio"
            name="css-seach-tabs"
            id="tab-1"
            defaultChecked
            className="tab-switch"
          />
          <label htmlFor="tab-1" className="tab-label border-top-left">
            <img
              className="tab-label-icon"
              src={airline_mode}
              alt="airline_mode"
            />
            <span>MUA VÉ</span>
          </label>
          <div className="search-tab-content">
            <SearchFlightInput updatesData={updatesData} />
          </div>
        </div>
        <div className="search-tab">
          <input
            type="radio"
            name="css-seach-tabs"
            id="tab-2"
            className="tab-switch"
          />
          <label htmlFor="tab-2" className="tab-label border-top-right">
            <img
              className="tab-label-icon"
              src={search_icon}
              alt="search_icon"
            />
            <span>TRA CỨU</span>
          </label>
          <div className="search-tab-content">
            <ManageBooking />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchTab;
