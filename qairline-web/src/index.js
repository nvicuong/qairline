import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import NewsPage from "./components/News/NewsPage";
import DestinationPage from "./components/Destination/DestinationPage";
import "./custom-bootstrap.scss";
import AddCategory from "./components/Admin/Add/AddCategory";
import ScrollToTop from "./components/Utils/ScrollToTop";
import FlightSearchPage from "./components/FlightSearch/FlightSearchPage";
import UserLogin from "./components/User/UserLogin";
import UserResign from "./components/User/UserRegister";
import ForgetPassword from "./components/User/ForgetPassword";
import MainDash from "./components/Admin/MainDash/MainDash";
import AddNews from "./components/Admin/AddNews/AddNews";
import AirportChange from "./components/Admin/Change/AirportChange";
import CustomerManage from "./components/Admin/CustomerManage/CustomerManage";
import ProfileInfo from "./components/User/UserProfile/Outlet/ProfileInfo";
import OrderHistory from "./components/User/UserProfile/Outlet/OrderHistory";
import FlightTracking from "./components/User/UserProfile/Outlet/FlightTracking";
import ChangePassword from "./components/User/UserProfile/Outlet/ChangePassword";
import AboutUsPage from "./components/AboutUs/AboutUsPage";
import HelpPage from "./components/Help/HelpPage";
import ArticleDetail from "./components/News/ArticleDetail";

window.alert = function (message) {
  const customAlert = document.createElement("div");
  customAlert.style.position = "fixed";
  customAlert.style.top = "20px"; // Cách top 20px
  customAlert.style.left = "50%"; // Căn giữa màn hình
  customAlert.style.transform = "translateX(-50%)"; // Căn chỉnh giữa trục X
  customAlert.style.minWidth = "300px"; // Đảm bảo chiều rộng tối thiểu 300px
  customAlert.style.maxWidth = "80%"; // Tùy chỉnh giới hạn chiều rộng tối đa (nếu cần)
  customAlert.style.padding = "20px";
  customAlert.style.backgroundColor = "#f8d7da";
  customAlert.style.color = "#721c24";
  customAlert.style.border = "1px solid #f5c6cb";
  customAlert.style.fontSize = "1.5rem";
  customAlert.style.borderRadius = "5px";
  customAlert.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  customAlert.style.zIndex = "1000";
  customAlert.style.textAlign = "center"; // Căn giữa nội dung
  customAlert.textContent = message;

  document.body.appendChild(customAlert);

  // Tự động xóa sau 3 giây
  setTimeout(() => {
    customAlert.remove();
  }, 3000);
};

window.confirm = function (message) {
  return new Promise((resolve) => {
    const confirmDialog = document.createElement("div");
    confirmDialog.style.position = "fixed";
    confirmDialog.style.top = "20px"; // Cách top 20px
    confirmDialog.style.left = "50%"; // Căn giữa màn hình
    confirmDialog.style.transform = "translateX(-50%)"; // Căn chỉnh giữa trục X
    confirmDialog.style.minWidth = "300px"; // Đảm bảo chiều rộng tối thiểu 300px
    confirmDialog.style.maxWidth = "80%"; // Tùy chỉnh giới hạn chiều rộng tối đa
    confirmDialog.style.padding = "20px";
    confirmDialog.style.backgroundColor = "#d1ecf1";
    confirmDialog.style.color = "#0c5460";
    confirmDialog.style.border = "1px solid #bee5eb";
    confirmDialog.style.fontSize = "1.2rem";
    confirmDialog.style.borderRadius = "5px";
    confirmDialog.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    confirmDialog.style.zIndex = "1000";
    confirmDialog.style.textAlign = "center"; // Căn giữa nội dung

    // Nội dung của hộp thoại
    confirmDialog.innerHTML = `
      <p>${message}</p>
      <div style="margin-top: 20px;">
        <button id="confirm-ok" style="
          padding: 10px 20px; 
          background-color: #28a745; 
          color: white; 
          border: none; 
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          margin-right: 10px;
        ">OK</button>
        <button id="confirm-cancel" style="
          padding: 10px 20px; 
          background-color: #dc3545; 
          color: white; 
          border: none; 
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
        ">Cancel</button>
      </div>
    `;

    document.body.appendChild(confirmDialog);

    // Xử lý sự kiện khi nhấn các nút
    document.getElementById("confirm-ok").onclick = () => {
      confirmDialog.remove();
      resolve(true); // OK được chọn
    };

    document.getElementById("confirm-cancel").onclick = () => {
      confirmDialog.remove();
      resolve(false); // Cancel được chọn
    };
  });
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/flights" element={<FlightSearchPage />} />
          <Route index element={<HomePage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserResign />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:category" element={<NewsPage />} />
          <Route path="/news/:category/:id" element={<ArticleDetail />} />
          <Route path="/destinations" element={<DestinationPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/help" element={<HelpPage />} />
        </Route>
        <Route path="/admins" element={<Admin />}>
          <Route index element={<MainDash />} />
          <Route path="/admins/category" element={<AddCategory />} />
          <Route path="/admins/news" element={<AddNews />} />
          <Route path="/admins/change" element={<AirportChange />} />
          <Route path="/admins/customers" element={<CustomerManage />} />
        </Route>
        <Route path="/users" element={<User />}>
          <Route index element={<ProfileInfo />} />
          <Route path="/users/orders" element={<OrderHistory />} />
          <Route path="/users/tracking" element={<FlightTracking />} />
          <Route path="/users/changepassword" element={<ChangePassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
