//import { Link } from "react-router-dom";
import "./UserLogin.scss";
import { useState, useEffect } from "react";
import "../Utils/Element.scss";
import Heading from "../Utils/Heading";
import { Link, useNavigate } from "react-router-dom";
import "./UserLogin.scss";
import "../Utils/Element.scss";
import API_BASE_URL from "../../config";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null); // Khai báo state cho token
  const [snackBarMessage, setSnackBarMessage] = useState(""); // Khai báo state cho thông báo snackbar
  const [snackBarOpen, setSnackBarOpen] = useState(false); // Khai báo state để mở/đóng snackbar
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const [isWrong, setIsWrong] = useState(false);

  const handleSubmit = (event) => {
    console.log(email);
    console.log(password);
    event.preventDefault();

    fetch(`${API_BASE_URL}/accounts/login`, {
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
        return response.json();
      })
      .then((data) => {
        console.log("Response body:", data);
        setIsWrong(false);

        // This code is a commitment between BE and FE
        if (data.code !== 1000) {
          throw new Error(data.message);
        }

        const receivedToken = data.result?.token;
        if (receivedToken) {
          console.log("set new token");
          setToken(receivedToken);
          localStorage.setItem("token", receivedToken);
        }
        localStorage.setItem("name", email);
        checkToken();
        // navigate("/");
      })
      .catch((error) => {
        setIsWrong(true);
        setSnackBarMessage(error.message);
        setSnackBarOpen(true);
      });
  };
  const checkToken = async () => {
    const storedToken = localStorage.getItem("token"); // Lấy token từ localStorage
    if (storedToken) {
      try {
        // Gửi token đến API
        const response = await fetch(`${API_BASE_URL}/accounts/check`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: storedToken }),
        });

        if (!response.ok) {
          throw new Error("Token validation failed");
        }

        const data = await response.json();
        console.log("Response body:", data);

        if (data.result?.valid) {
          localStorage.setItem("isLoggedIn", "true");
          setIsLoggedIn(true); // Cập nhật trạng thái logged in
          window.location.href = "/";
        } else {
          localStorage.setItem("isLoggedIn", "false");
          setIsLoggedIn(false); // Cập nhật trạng thái logged out
        }
      } catch (error) {
        console.error("Error validating token:", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };
  return (
    <div className="user-login-container container">
      {/* <Background /> */}
      <Heading title="Đăng nhập" />
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
        {isWrong && (
          <span style={{ color: "red" }}>
            Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại.
          </span>
        )}
        <Link className="p-0" to="/forget-password">
          Quên mật khẩu?
        </Link>
        <button type="submit" className="purple-button">
          Đăng nhập
        </button>
      </form>
      <div className="social-login row">
        <p className="m-0">Hoặc đăng nhập bằng:</p>
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
        Chưa có tài khoản?{" "}
        <Link className="p-0" to="/register">
          Đăng ký ngay
        </Link>{" "}
      </p>
    </div>
  );
};
export default UserLogin;
