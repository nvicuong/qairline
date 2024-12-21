import { useState } from "react";
import Heading from "../Utils/Heading";
import "./HelpPage.scss";
import NavigatorPath from "../Utils/NavigatorPath";

const HelpPage = () => {
  const navigatorPath = [
    { title: "Trang chủ", link: "/" },
    { title: "Trợ giúp", link: "/help" },
  ];

  const [feedback, setFeedback] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (feedback.trim()) {
      // Code xử lý gửi ý kiến phản hồi
      setSuccessMessage("Cảm ơn bạn đã gửi ý kiến phản hồi!");
      setFeedback("");
    }
  };

  return (
    <div className="help-container container-fluid">
      <div className="content container">
        <NavigatorPath paths={navigatorPath} />
        <Heading title="Trợ giúp" />

        {/* Mục ý kiến phản hồi */}
        <div className="feedback-section">
          <h3>Ý kiến phản hồi và yêu cầu trợ giúp</h3>
          <form onSubmit={handleSubmitFeedback}>
            <div className="form-group">
              <label htmlFor="feedback">Viết ý kiến của bạn:</label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Viết ý kiến của bạn ở đây..."
              ></textarea>
            </div>
            <button type="submit" className="purple-button">
              Gửi ý kiến
            </button>
          </form>
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </div>

        {/* Hỏi đáp thường gặp */}
        <div className="faq-section">
          <h3>Hỏi đáp thường gặp (FAQ)</h3>
          <ul>
            <li>
              <strong>Q: Làm thế nào để thay đổi thông tin tài khoản?</strong>
              <p>
                A: Bạn có thể thay đổi thông tin tài khoản trong mục cài đặt của
                tài khoản.
              </p>
            </li>
            <li>
              <strong>Q: Tôi có thể thay đổi chuyến bay đã đặt?</strong>
              <p>
                A: Vui lòng liên hệ với bộ phận chăm sóc khách hàng để biết thêm
                thông tin chi tiết.
              </p>
            </li>
            <li>
              <strong>
                Q: Làm thế nào để yêu cầu hoàn tiền cho chuyến bay?
              </strong>
              <p>
                A: Bạn có thể yêu cầu hoàn tiền trong mục quản lý đặt vé của bạn
                trên website.
              </p>
            </li>
          </ul>
        </div>

        {/* Liên hệ hỗ trợ */}
        <div className="contact-support">
          <h3>Liên hệ với chúng tôi</h3>
          <p>
            Nếu bạn có bất kỳ câu hỏi nào hoặc cần trợ giúp, vui lòng liên hệ
            với chúng tôi qua các kênh sau:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a href="mailto:support@example.com">support@example.com</a>
            </li>
            <li>Điện thoại: +84 123 456 789</li>
            <li>Địa chỉ văn phòng: 123 Đường ABC, Thành phố XYZ</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
