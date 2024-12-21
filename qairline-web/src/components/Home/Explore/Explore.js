import "./Explore.scss";

import Heading from "../../Utils/Heading";
import long_bien from "../../../assets/images/long_bien.jpg";
import paris from "../../../assets/images/paris.jpg";
import kyoto from "../../../assets/images/kyoto.jpg";
import new_zealand from "../../../assets/images/new_zealand.jpg";
import moscow from "../../../assets/images/moscow.jpg";
import singapore from "../../../assets/images/singapore.jpg";
import ExploreCard from "../ExploreCard";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const navigate = useNavigate();

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
    <div className="explore-container container-fluid position-relative">
      <div className="content container">
        <div className="row justify-content-end">
          <div className="col-4">
            <ExploreCard
              title="Paris"
              link={paris}
              position="top-left"
              onSearch={onSearch}
            />
          </div>
          <div className="col-6 row justify-content-end">
            <Heading title="Điểm đến lý tưởng" link="/destinations" />
            <div className="col-8">
              <ExploreCard
                title="Singapore"
                link={singapore}
                position="top-right"
                onSearch={onSearch}
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-end">
          <div className="col-7 top--100">
            <ExploreCard
              title="Hà Nội"
              link={long_bien}
              position="bottom-left"
              onSearch={onSearch}
            />
          </div>
        </div>
        <div className="row justify-content-between expolore-end">
          <div className="col-4 top-350">
            <ExploreCard
              title="Kyoto"
              link={kyoto}
              position="top-left"
              onSearch={onSearch}
            />
          </div>
          <div className="col-4">
            <ExploreCard
              title="New Zealand"
              link={new_zealand}
              position="bottom-left"
            />
          </div>
          <div className="col-4">
            <ExploreCard
              title="Moscow"
              link={moscow}
              position="bottom-right"
              onSearch={onSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
