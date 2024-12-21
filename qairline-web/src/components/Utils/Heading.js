import { Link } from "react-router-dom";
import "./Heading.scss";

const Heading = ({ title, description, link }) => {
  return (
    <div className="heading-container">
      {link ? (
        <Link to={link} className="heading-link">
          <h1>{title}</h1>
        </Link>
      ) : (
        <h1>{title}</h1>
      )}
      {description && description.length > 0 && <p>{description}</p>}
    </div>
  );
};

export default Heading;
