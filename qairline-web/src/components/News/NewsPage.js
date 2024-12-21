// src/components/NewsPage.js
import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import NewsSlider from "../Home/NewsSlider";
import Heading from "../Utils/Heading";
import "./NewsPage.scss";
import example_image from "../../assets/images/1.jpg";
import { Link } from "react-router-dom";
import NavigatorPath from "../Utils/NavigatorPath";
import ScrollToTop from "../Utils/ScrollToTop";
import articles from "../../assets/data/news";
import Article from "./Article";
import { fetchAllArticles } from "../../services/apiServices";
import axios, { all } from "axios";
import API_BASE_URL from "../../config";

const NewsPage = () => {
  const { category } = useParams();
  const [allArticles, setAllArticles] = useState([]);
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

  const navigatorPath = useMemo(
    () => [
      { title: "Trang chủ", link: "/" },
      { title: "Tin tức", link: "/news" },
      ...(category
        ? [
            {
              title: getCategoryDisplayName(category),
              link: `/news/${category}`,
            },
          ]
        : []),
    ],
    [category]
  );

  useEffect(() => {
    fetchAllArticles(setAllArticles, setLoading, setError);
  }, []);

  const filteredArticles = category
    ? allArticles.filter((article) => article.type === category)
    : allArticles;

  if (loading) {
    return (
      <div className="news-page-container container-fluid">
        <div className="content container">
          <ScrollToTop />
          <NavigatorPath paths={navigatorPath} />
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-page-container container-fluid">
        <div className="content container">
          <ScrollToTop />
          <NavigatorPath paths={navigatorPath} />
          <p>Có lỗi xảy ra: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="news-page-container container-fluid">
      <div className="content container">
        <ScrollToTop />
        <NavigatorPath paths={navigatorPath} />

        {category ? (
          <>
            <Heading title={`${getCategoryDisplayName(category)}`} />
            <div className="article-list">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <Article key={article.id} {...article} />
                ))
              ) : (
                <p>Không có bài viết nào trong danh mục này.</p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="news-container container">
              <Heading title="Tin tức" />
              <div className="row">
                <div className="col-8">
                  <div className="news-content">
                    <div className="main-article">
                      <img
                        src={
                          filteredArticles.length > 0
                            ? API_BASE_URL + filteredArticles[0].image
                            : example_image
                        }
                        alt=""
                      />
                      <div className="main-article-content">
                        <h3>
                          {filteredArticles.length > 0
                            ? filteredArticles[0].title
                            : "Không có bài viết"}
                        </h3>
                        <p>
                          {filteredArticles.length > 0
                            ? filteredArticles[0].content
                            : "Không có bài viết"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="categories col-lg-4">
                  <div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
                    <h3 className="m-0">Danh mục</h3>
                  </div>
                  <div className="position-relative overflow-hidden mb-3 d-flex justify-content-end">
                    <Link
                      to="/news/announcement"
                      className="overlay align-items-center justify-content-center h4 m-0 text-decoration-none right-border"
                    >
                      Thông báo
                    </Link>
                  </div>
                  <div className="position-relative overflow-hidden mb-3 d-flex justify-content-end">
                    <Link
                      to="/news/procedure"
                      className="overlay align-items-center justify-content-center h4 m-0 text-decoration-none right-border"
                    >
                      Thủ tục
                    </Link>
                  </div>
                  <div className="position-relative overflow-hidden mb-3 d-flex justify-content-end">
                    <Link
                      to="/news/travel-guide"
                      className="overlay align-items-center justify-content-center h4 m-0 text-decoration-none right-border"
                    >
                      Cẩm nang du lịch
                    </Link>
                  </div>
                  <div className="position-relative overflow-hidden d-flex justify-content-end">
                    <Link
                      to="/news/experience"
                      className="overlay align-items-center justify-content-center h4 m-0 text-decoration-none right-border"
                    >
                      Trải nghiệm
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Heading title="Tin Khác" />
            <NewsSlider />
          </>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
