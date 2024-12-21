import "./AboutUs.scss";
import flight_attendant from "../../../assets/images/flight_attendant.png";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="about-us-container container">
      <div className="row justify-content-around">
        <div className="about-us-content col-12 col-md-5 ">
          <p className="about-us-welcome">
            Chào mừng đến với <strong>QAirlines</strong>{" "}
          </p>
          <h1 className="about-us-title">
            Sẵn sàng đem lại cảm giác tuyệt vời nhất cho bạn.{" "}
          </h1>
          <p className="about-us-description">
            Chúng tôi tự hào là người bạn đồng hành đáng tin cậy trên mỗi hành
            trình của bạn. Với đội ngũ phi hành đoàn chuyên nghiệp, dịch vụ tận
            tâm, và đội máy bay hiện đại, <strong>QAirlines</strong> cam kết
            mang đến cho bạn những trải nghiệm bay an toàn, thoải mái, và đẳng
            cấp.
          </p>
          <button
            className="purple-button about-us-button"
            onClick={() => navigate("/about-us")}
          >
            Về chúng tôi
          </button>
        </div>
        <div className="about-us-image col-12 col-md-6 p-0">
          <img src={flight_attendant} alt="flight attendant" />
          <div className="about-us-image-border"></div>
        </div>
      </div>
      <div className="about-us-statistics text-center">
        <div className="row">
          <div className="col-6 col-md-3 statistics-item">
            <h2 className="statistics-number">
              150<strong>+</strong>
            </h2>
            <p className="statistics-label">Điểm đến toàn cầu</p>
          </div>
          <div className="col-6 col-md-3 statistics-item">
            <h2 className="statistics-number">
              120<strong>+</strong>
            </h2>
            <p className="statistics-label">Máy bay hiện đại</p>
          </div>
          <div className="col-6 col-md-3 statistics-item">
            <h2 className="statistics-number">
              1M<strong>+</strong>
            </h2>
            <p className="statistics-label">Khách hàng phục vụ mỗi năm</p>
          </div>
          <div className="col-6 col-md-3 statistics-item">
            <h2 className="statistics-number">
              50<strong>+</strong>
            </h2>
            <p className="statistics-label">Năm kinh nghiệm hoạt động</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
