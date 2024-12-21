import SearchTab from "./SearchTab";
import "./HomePage.scss";
import Explore from "./Explore/Explore";
import FlightList from "./FlightList";
import News from "./News";
import ScrollToTop from "../Utils/ScrollToTop";
import RecommendedDestination from "./RecommendedDestination/RecommendedDestination";
import AboutUs from "./AboutUs/AboutUs";
import ENewsletter from "./ENewsletter";
import Background from "../Utils/Background";

const HomePage = () => {
  return (
    <>
      <Background />
      <SearchTab />
      <AboutUs />
      <Explore />
      <RecommendedDestination />
      <FlightList />
      <News />
      <ENewsletter />
    </>
  );
};
export default HomePage;
