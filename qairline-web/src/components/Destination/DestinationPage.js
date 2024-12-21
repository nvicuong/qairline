import { useEffect, useState } from "react";
import Heading from "../Utils/Heading";
import ExploreCard from "../Home/ExploreCard";
import "./DestinationPage.scss";
import NavigatorPath from "../Utils/NavigatorPath";
import destination from "../../assets/images/destination.jpg";
import { useNavigate } from "react-router-dom";

const countries = {
  Vietnam: ["Quảng Ninh", "Đà Nẵng", "Hà Nội", "Sài Gòn"],
  Japan: ["Tokyo", "Kyoto", "Osaka"],
  France: ["Paris", "Nice", "Lyon", "Marseille"],
};

const DestinationPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Điểm đến";
  }, []);
  const [selectedCountry, setSelectedCountry] = useState("Vietnam");
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const navigatorPath = [
    { title: "Trang chủ", link: "/" },
    { title: "Điểm đến", link: "/destinations" },
  ];

  const onSearch = (title) => {
    const data = {
      from: "",
      to: title,
      date: "",
      adult: 1,
      children: 0,
      class: "Phổ thông",
      search: true,
    };
    navigate("/flights", { state: { data: data } });
  };
  return (
    <div className="destination-container container-fluid">
      <div className="content container">
        <NavigatorPath paths={navigatorPath} />
        <Heading title="Khám phá điểm đến" />

        {/* Bộ chọn quốc gia */}
        <div className="country-selector">
          <label htmlFor="country-select">Chọn quốc gia: </label>
          <select
            id="country-select"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            {Object.keys(countries).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Hiển thị các địa điểm */}
        <div className="explore-cards-container row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-1">
          {countries[selectedCountry].map((place, index) => (
            <ExploreCard
              key={index}
              title={place}
              link={destination}
              onSearch={onSearch}
              position="top-left"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationPage;
