import "./RecommendedDestination.scss";
import Heading from "../../Utils/Heading";
import ExploreCard from "../ExploreCard";
import paris from "../../../assets/images/paris.jpg";
import kyoto from "../../../assets/images/kyoto.jpg";
import hoi_an from "../../../assets/images/hoi_an.png";
import phu_quoc from "../../../assets/images/phu_quoc.jpg";

const RecommendedDestination = () => {
  return (
    <div className="recommended-destination-container container-fluid">
      <div className="content container">
        <div className="row justify-content-center">
          <div className="col-4">
            <ExploreCard title="PHÚ QUỐC" link={phu_quoc} position="top-left" />
            <Heading description="Chúng tôi mong muốn giới thiệu đến bạn một số địa điểm tuyệt vời để khám phá, mang đến cho bạn những trải nghiệm du lịch độc đáo và đầy ấn tượng. Những điểm đến này không chỉ đẹp mà còn là những hành trình kỳ diệu để bạn thư giãn, khám phá và tạo dựng những kỷ niệm khó quên." />
          </div>
          <div className="col-4">
            <Heading title="Đề xuất" />
            <ExploreCard title="HỘI AN" link={hoi_an} position="top-right" />
          </div>
        </div>
      </div>
      <div className="cross-bar"></div>
    </div>
  );
};
export default RecommendedDestination;
