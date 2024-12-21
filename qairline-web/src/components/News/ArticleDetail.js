import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ArticleDetail.scss";
import axios from "axios";
import ScrollToTop from "../Utils/ScrollToTop";
import NavigatorPath from "../Utils/NavigatorPath";
import News from "../Home/News";
import NewsSlider from "../Home/NewsSlider";
import Heading from "../Utils/Heading";
import API_BASE_URL from "../../config";

const ArticleDetail = () => {
  const { category, id } = useParams(); // Lấy thông tin từ URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCategoryDisplayName = (category) => {
    const categoryNames = {
      announcement: "Thông báo",
      procedure: "Thủ tục",
      "travel-guide": "Cẩm nang du lịch",
      experience: "Trải nghiệm",
    };

    return categoryNames[category] || category;
  };

  const navigatorPath = [
    { title: "Trang chủ", link: "/" },
    { title: "Tin tức", link: "/news" },
    { title: getCategoryDisplayName(category), link: `/news/${category}` },
    { title: article?.title ? article.title : "Bài viết" },
  ];

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

  useEffect(() => {
    // Gọi API để lấy dữ liệu bài viết dựa trên category và id
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/news/get/${id}`);
        setArticle(response.data.result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [category, id]); // Chạy lại khi category hoặc id thay đổi

  if (loading) {
    return (
      <div className="article-detail container-fluid">
        <div className="content container">
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="article-detail container-fluid">
        <div className="content container">
          <p>Có lỗi xảy ra: {error}</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-detail container-fluid">
        <div className="content container">
          <p>Bài viết không tồn tại.</p>
        </div>
      </div>
    );
  }

  return (
    // id, image, title, content, created_at, type
    <div className="article-detail container-fluid">
      <div className="content container">
        <ScrollToTop />
        <NavigatorPath paths={navigatorPath} />
        <div className="article-detail-header">
          <img
            src={API_BASE_URL + article.image}
            alt={article.title}
            className="article-image"
          />
          <h1>{article.title}</h1>
          <p className="time text-end">{article.time}</p>
        </div>
        <div className="article-content">
          <p>{article.content}</p>
        </div>
        <div className="article-detail-footer">
          <p className="time text-end">{formatTime(article.created_at)}</p>
        </div>
        <Heading title="Tin tức khác" />
        <NewsSlider />
      </div>
    </div>
  );
};

export default ArticleDetail;
