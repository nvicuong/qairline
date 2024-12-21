import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation(); // Lấy thông tin URL hiện tại

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu mỗi khi location thay đổi
  }, [location]);

  return null; // Không cần render gì
};

export default ScrollToTop;
