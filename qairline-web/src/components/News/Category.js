import NewsSlider from "../Home/NewsSlider";
import "./Category.scss";
import Heading from "../Utils/Heading";

const articles = [
  { id: 1, title: "Bài báo 1" },
  { id: 2, title: "Bài báo 2" },
  { id: 3, title: "Bài báo 3" },
  { id: 4, title: "Bài báo 4" },
];

const Category = () => {
  return (
    <div className="category-container">
      <h1 className="category-title">Danh mục</h1>
      <ul className="article-list">
        {articles.map((article) => (
          <li key={article.id} className="article-item">
            {article.title}
          </li>
        ))}
      </ul>
      <Heading title="Tin Khác" />
      <NewsSlider />
    </div>
  );
};
export default Category;
