import { useState } from "react";
import Heading from "../Utils/Heading";
import "./AboutUsPage.scss";
import NavigatorPath from "../Utils/NavigatorPath";
import about_us_video from "../../assets/videos/about-us.mp4";

const AboutUsPage = () => {
  const navigatorPath = [
    { title: "Trang chủ", link: "/" },
    { title: "Giới thiệu", link: "/about-us" },
  ];

  return (
    <div className="about-us-page-container container-fluid">
      <div className="content container">
        <NavigatorPath paths={navigatorPath} />
        <Heading title="Về chúng tôi" />

        {/* Giới thiệu công ty */}
        <div className="about-us-intro">
          <p>
            <strong>Chúng tôi</strong> tự hào là công ty vận chuyển hàng không
            hàng đầu với hơn 20 năm kinh nghiệm. Sứ mệnh của chúng tôi là mang
            đến sự an toàn, tiện nghi và trải nghiệm tuyệt vời trên mỗi chuyến
            bay.
          </p>
        </div>

        {/* Sứ mệnh, tầm nhìn và giá trị cốt lõi */}
        <div className="about-us-mission">
          <h3>Sứ mệnh</h3>
          <p>
            Đem lại cho hành khách những chuyến bay an toàn, tiện nghi và thân
            thiện với môi trường. Chúng tôi cam kết đồng hành cùng bạn trên mỗi
            hành trình.
          </p>
          <h3>Tầm nhìn</h3>
          <p>
            Trở thành hãng hàng không được yêu thích nhất thế giới, không ngừng
            đổi mới và mở rộng dịch vụ để đáp ứng nhu cầu ngày càng cao của
            khách hàng.
          </p>
          <h3>Giá trị cốt lõi</h3>
          <ul>
            <li>Khách hàng là trung tâm của mọi hoạt động.</li>
            <li>Đổi mới liên tục để cải thiện chất lượng dịch vụ.</li>
            <li>Tôn trọng con người và môi trường.</li>
            <li>Hợp tác và phát triển bền vững.</li>
          </ul>
        </div>

        {/* Lịch sử phát triển */}
        <div className="about-us-history">
          <h3>Lịch sử phát triển</h3>
          <ul>
            <li>
              <strong>2000:</strong> Thành lập công ty với sứ mệnh cung cấp dịch
              vụ hàng không chất lượng cao.
            </li>
            <li>
              <strong>2010:</strong> Đạt cột mốc 1 triệu hành khách phục vụ mỗi
              năm.
            </li>
            <li>
              <strong>2020:</strong> Giới thiệu đội bay thân thiện với môi
              trường, giảm 30% lượng khí thải CO₂.
            </li>
            <li>
              <strong>2023:</strong> Mở rộng mạng lưới bay tới hơn 100 điểm đến
              quốc tế.
            </li>
          </ul>
        </div>

        {/* Điểm nổi bật */}
        <div className="about-us-highlights">
          <h3>Điểm nổi bật</h3>
          <ul>
            <li>An toàn và tiện nghi trên mỗi chuyến bay.</li>
            <li>Dịch vụ chăm sóc khách hàng đạt chuẩn quốc tế.</li>
            <li>Đội ngũ nhân viên tận tâm và chuyên nghiệp.</li>
            <li>Đội bay hiện đại, thân thiện với môi trường.</li>
          </ul>
        </div>

        {/* Thành tựu nổi bật */}
        <div className="about-us-achievements">
          <h3>Thành tựu nổi bật</h3>
          <ul>
            <li>Được vinh danh là "Hãng hàng không của năm" vào 2022.</li>
            <li>
              Đạt chứng nhận 5 sao từ Hiệp hội Vận tải Hàng không Quốc tế
              (IATA).
            </li>
            <li>Giảm 30% lượng khí thải CO₂ nhờ đội bay hiện đại.</li>
          </ul>
        </div>

        {/* Đội ngũ lãnh đạo */}
        <div className="about-us-team">
          <h3>Đội ngũ lãnh đạo</h3>
          <p>
            Đội ngũ lãnh đạo của chúng tôi bao gồm những chuyên gia hàng đầu với
            tầm nhìn chiến lược và tâm huyết, đảm bảo sự phát triển bền vững và
            đột phá của công ty.
          </p>
        </div>

        {/* Cam kết với khách hàng */}
        <div className="about-us-commitments">
          <h3>Cam kết với khách hàng</h3>
          <ul>
            <li>
              Luôn đảm bảo an toàn là ưu tiên hàng đầu trên mọi chuyến bay.
            </li>
            <li>
              Không ngừng nâng cấp và đổi mới để mang lại sự hài lòng cao nhất.
            </li>
            <li>Lắng nghe và thấu hiểu nhu cầu của từng khách hàng.</li>
          </ul>
        </div>
        <video className="background-video" autoPlay loop muted playsInline>
          <source src={about_us_video} type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ video.
        </video>
      </div>
    </div>
  );
};
export default AboutUsPage;
