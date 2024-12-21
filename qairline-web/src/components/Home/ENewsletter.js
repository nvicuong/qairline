import React, { useState } from "react";
import "./ENewsletter.scss"; // File CSS tuỳ chỉnh
import Heading from "../Utils/Heading";

const ENewsletter = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      // Xử lý logic gửi email tại đây, ví dụ gọi API
      console.log("Email đăng ký:", email);
      setSuccess(true);
      setError("");
      setEmail(""); // Reset form
    } else {
      setError("Vui lòng nhập một địa chỉ email hợp lệ.");
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="e-newsletter container-fluid ">
      <div className="content container justify-content-md-center">
        <Heading
          title="Đăng ký E-Newsletter"
          description="Nhận các thông tin mới nhất về ưu đãi, chương trình khuyến mãi và tin tức của chúng tôi."
        />
        <div className="row justify-content-center">
          <form
            onSubmit={handleSubmit}
            className="newsletter-form col-xl-6 col-md-12"
          >
            <div className="form-group">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input"
                required
              />
              <button type="submit" className="purple-button">
                Đăng ký
              </button>
            </div>
            {success && (
              <p className="newsletter-success">
                Cảm ơn bạn đã đăng ký thành công!
              </p>
            )}
            {error && <p className="newsletter-error">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ENewsletter;
