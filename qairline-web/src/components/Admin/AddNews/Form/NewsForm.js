import React, { useState, useEffect } from "react";
import "./NewsForm.css";
import axios from "axios";
import API_BASE_URL from "../../../../config";

const NewsForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "PROCEDURE",
    content: "",
    image: null,
  });

  const [postMethod, setPostMethod] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPostMethod(true);
  };

  useEffect(() => {
    if (!postMethod) return;
    const data = new FormData();
    data.append(
      "json",
      new Blob(
        [
          JSON.stringify({
            title: formData.title,
            type: formData.type,
            content: formData.content,
          }),
        ],
        { type: "application/json" } // Xác định rõ định dạng là JSON
      )
    );

    // Append file data
    data.append("image", formData.image);

    const postData = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/news/create`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Tạo thành công");
      } catch (error) {
        alert("Tạo thất bại");
        console.error("Error occurred while posting data:", error);
        if (error.response) {
          console.error("Server responded with:", error.response.data);
        } else if (error.request) {
          console.error("No response received from server:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
      } finally {
        setPostMethod(false);
        setFormData({
          title: "",
          type: "PROCEDURE",
          content: "",
          image: null,
        });
      }
    };

    postData();
  }, [postMethod, formData]);

  return (
    <form onSubmit={handleSubmit} className="news-form container-fluid">
      <h1>Tạo tin mới</h1>

      <div className="form-group">
        <label htmlFor="title">Tiêu đề:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="type">Kiểu:</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          required
        >
          <option value="PROCEDURE">Thủ tục</option>
          <option value="EXPERIENCE">Trải nghiệm</option>
          <option value="ANNOUNCEMENT">Thông báo</option>
          <option value="TRAVEL_GUIDE">Cẩm nang du lịch</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="content">Nội dung:</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="image-form-group">
        <label htmlFor="image">Ảnh:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <button type="submit" className="purple-button">
        Submit
      </button>
    </form>
  );
};

export default NewsForm;
