import "./Quote.scss";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
const Quote = () => {
  const navigate = useNavigate();
  const fromInputRef = useRef("from");

  const handleBookNowClick = () => {
    const fromInput = document.getElementById("from");
    if (fromInput) {
      fromInput.focus();
      fromInput.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  return (
    <div className="quote-container">
      <p className="title">
        Trải nghiệm <strong>đẳng cấp</strong> <br /> <strong>Trọn</strong> mọi
        khoảnh khắc
      </p>
      <p className="description">
        Những chuyến bay hoàn hảo, nơi an toàn, sự tinh tế và niềm vui hòa quyện
        để tạo nên hành trình đáng nhớ.
      </p>
      <button className="white-button" onClick={handleBookNowClick}>
        Đặt vé ngay
      </button>
      <button className="purple-button" onClick={() => navigate("/about-us")}>
        Tìm hiểu thêm
      </button>
    </div>
  );
};
export default Quote;
