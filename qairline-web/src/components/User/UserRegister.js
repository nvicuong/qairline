import "./UserRegister.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Utils/Element.scss";
import Heading from "../Utils/Heading";
import API_BASE_URL from "../../config";

//import { Link } from "react-router-dom";

const UserResign = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState(""); // Khai báo state cho thông báo snackbar
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== passwordConfirm) {
      alert("Mật khẩu không khớp lỗi tạo tài khoản");
    } else {
      fetch(`${API_BASE_URL}/accounts/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },

        body: JSON.stringify({
          username: email,
          password: password,
        }),
      })
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Response body:", data);
          alert("Tạo tài khoản thành công");
          if (data.code !== 1000) {
            throw new Error(data.message);
          }

          localStorage.setItem("name", email);
          navigate("/login");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Tạo tài khoản thất bại vì username đã tồn tại");
          setSnackBarMessage(error.message);
          setSnackBarOpen(true);
        });
    }
  };

  return (
    <div className="user-resign-container container">
      <Heading title="Đăng ký" />
      <form className="row" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Mật khẩu"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password-confirm"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            placeholder="Xác nhận mật khẩu"
          />
        </div>
        <button type="submit" className="purple-button">
          Đăng ký
        </button>
      </form>
      <div className="social-login row">
        <p className="m-0">Hoặc đăng ký bằng:</p>
        <button
          onClick={() =>
            alert("Tính năng đang bảo trì, vui lòng quay lại sau!")
          }
          type=""
        >
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/nolan/64/facebook-new.png"
            alt="facebook-new"
          />
        </button>
        <button
          onClick={() =>
            alert("Tính năng đang bảo trì, vui lòng quay lại sau!")
          }
          type=""
        >
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/stickers/50/google-logo.png"
            alt="google-logo"
          />
        </button>
      </div>
      <p className="">
        Đã có tài khoản? <span> </span>
        <Link className="p-0" to="/login">
          Đăng nhập
        </Link>
      </p>
    </div>
  );
};
export default UserResign;
