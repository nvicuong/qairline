import Heading from "../Utils/Heading";
import "./Explore.scss";
import ExploreCard from "./ExploreCard";
const Explore = () => {
  return (
    <div className="explore-container">
      <Heading
        title="Điểm đến lý tưởng"
        description="Tình ca, những tiếng nói thiết tha và tuyệt vời nhất của một đời người.
        Bao giờ, cũng bắt đầu từ một nơi chốn nào đó."
        link="/destinations"
      />
      <div className="explore-card-container container row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 gx-1">
        <ExploreCard />
        <ExploreCard />
        <ExploreCard />
        <ExploreCard />
        <ExploreCard />
      </div>
    </div>
  );
};

export default Explore;
