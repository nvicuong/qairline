import "./NewsSlider.scss";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Article from "../News/Article";
import { fetchAllArticles } from "../../services/apiServices";

function NewsSlider() {
  const [active, setActive] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllArticles(
      (data) => {
        setAllArticles(data.slice(0, 5));
        setLoading(false);
        handleDotClick(1);
      },
      setLoading,
      setError
    );
  }, []);

  const lengthItems = allArticles.length;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [active]);

  const handleNext = () => {
    setActive((prevActive) => (prevActive + 1) % lengthItems);
  };

  const handlePrev = () => {
    setActive((prevActive) => (prevActive - 1 + lengthItems) % lengthItems);
  };

  const handleDotClick = (index) => {
    setActive(index);
    resetInterval();
  };

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 3000);
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transition = "left 1s ease"; // Thêm hiệu ứng
      sliderRef.current.style.left = `-${active * (100 / 3)}%`; // Mỗi lần chuyển 1 card
    }
  }, [active]);

  const navigate = useNavigate();

  const handleItemClick = (item) => {
    navigate("/news", {
      state: {
        title: item.title,
        description: item.description,
      },
    });
  };

  return (
    <div className="slider">
      <div className="list" ref={sliderRef}>
        {allArticles.map((item, index) => (
          <Article key={index} {...item} />
        ))}
      </div>
      {/* <div className="buttons">
        <button id="prev" onClick={handlePrev}>
          &lt;
        </button>
        <button id="next" onClick={handleNext}>
          &gt;
        </button>
      </div> */}
      <ul className="dots">
        {allArticles.map((_, index) => (
          <li
            key={index}
            className={active === index ? "active" : ""}
            onClick={() => handleDotClick(index)}
          ></li>
        ))}
      </ul>
    </div>
  );
}

export default NewsSlider;
