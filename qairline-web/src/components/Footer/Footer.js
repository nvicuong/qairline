import "./Footer.scss";
import white_logo from "../../assets/images/logo_white.svg";
import background from "../../assets/images/footer.jpg";

const Footer = () => {
  return (
    <div className="pg-footer">
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-content-column">
            <div className="footer-logo">
              <img src={white_logo} className="footer-logo" href="#"></img>
            </div>
            <div className="footer-menu">
              <h2 className="footer-menu-name"> Công ty</h2>
              <ul id="menu-company" className="footer-menu-list">
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <a href="#">Liên hệ</a>
                </li>
                <li className="menu-item menu-item-type-taxonomy menu-item-object-category">
                  <a href="#">Tin tức</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-content-column">
            <div className="footer-menu">
              <h2 className="footer-menu-name"> Pháp lý</h2>
              <ul id="menu-legal" className="footer-menu-list">
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-170434">
                  <a href="#">Chính sách bảo mật</a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <a href="#">Điều khoản sử dụng</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-content-column">
            <div className="footer-menu">
              <h2 className="footer-menu-name"> Liên kết nhanh</h2>
              <ul id="menu-quick-links" className="footer-menu-list">
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <a target="_blank" rel="noopener noreferrer" href="#">
                    Trung tâm hỗ trợ
                  </a>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <a target="_blank" rel="noopener noreferrer" href="#">
                    Trạng thái dịch vụ
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-content-column">
            <div className="footer-call-to-action">
              <h2 className="footer-call-to-action-title"> Thắc mắc</h2>
              <p className="footer-call-to-action-description">
                Có câu hỏi hỗ trợ?
              </p>
              <button className="white-button"> Liên hệ với chúng tôi </button>
            </div>
            <div className="footer-call-to-action">
              <h2 className="footer-call-to-action-title">
                {" "}
                Gọi cho chúng tôi
              </h2>
              <p className="footer-call-to-action-link-wrapper">
                <a
                  className="footer-call-to-action-link"
                  href="tel:0124-64XXXX"
                  target="_self"
                >
                  0124-64XXXX
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="footer-copyright-wrapper">
            <p className="footer-copyright-text">
              <a className="footer-copyright-link" href="#" target="_self">
                ©2024. All rights reserved.
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
