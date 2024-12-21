import "./Background.scss";
import Quote from "../Home/Quote";
import background from "../../assets/images/aircraft_background.jpg";

const Background = () => {
  return (
    <div className="background-container">
      <div className="container">
        <Quote />
      </div>
      <div className="overlay"></div>
      <img src={background} alt="" />
    </div>
  );
};
export default Background;
