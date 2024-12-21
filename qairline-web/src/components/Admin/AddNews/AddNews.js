import React, {useState} from "react";
import "./AddNews.css";
import NewsForm from "./Form/NewsForm";
import { List } from "@mui/material";
import ListNews from "./Form/ListNews";

const AddNews = () => {
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
          Thêm tin tức
        </button>
        <button
          className={activeButton === "Button2" ? "active" : ""}
          onClick={() => handleButtonClick("Button2")}
        >
          Hiện thị tin tức
        </button>
      </div>
      <div className="info-custom">
        {activeButton === "Button1" ? <NewsForm /> : <ListNews />}
      </div>
    </div>
  );
};

export default AddNews;
