import Heading from "../Utils/Heading";
import "./News.scss";
import NewsSlider from "./NewsSlider";
const News = () => {
  return (
    <div className="news-container container-fluid position-relative">
      <div className="content container">
        <Heading title="Tin tức" link="/news" />
        <NewsSlider />
      </div>
    </div>
  );
};
export default News;
