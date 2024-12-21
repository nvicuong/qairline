import "./NavigatorPath.scss";
import { Link } from "react-router-dom";
import React from "react";

const NavigatorPath = ({ paths }) => {
  return (
    <div className="navigator-path">
      {paths.map((path, index) => (
        <React.Fragment key={index}>
          {path.link ? (
            <Link
              to={path.link}
              className="navigator-element-link navigator-element"
            >
              {path.title}
            </Link>
          ) : (
            <span className="navigator-element"> {path.title} </span>
          )}
          {index < paths.length - 1 && (
            <span className="navigator-separator"> &gt; </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
export default NavigatorPath;
