import "./ForgetPassword.scss";
import { useState } from "react";
import "../Utils/Element.scss";
import Heading from "../Utils/Heading";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email: ", email);
  };

  return (
    <div className="forget-password-container container">
      <Heading title="Quên mật khẩu" />
      <form className="row" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
          />
        </div>
        <button type="submit" className="purple-button">
          Gửi
        </button>
      </form>
      <Link className="p-0" to="/login">
        Quay lại đăng nhập
      </Link>
    </div>
  );
};
export default ForgetPassword;
