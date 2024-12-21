import "./Article.scss";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config";

const Article = (preps) => {
  const { id, image, title, content, created_at, type } = preps;
  const navigate = useNavigate();

  // Format thời gian
  const formatTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };

  const handleNavigate = () => {
    navigate(`/news/${type}/${id}`);
  };

  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  return (
    <div className="item cursor" key={id} onClick={() => handleNavigate()}>
      <img src={API_BASE_URL + image} alt={title} />
      <div className="card-content d-flex flex-column">
        <h3>{title}</h3>
        <p>{truncateText(content, 150)}</p>
        <p className="time text-end">{formatTime(created_at)}</p>
      </div>
    </div>
  );
};

export default Article;
