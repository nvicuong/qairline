import React, { useEffect, useState } from "react";
import "./ListNews.scss";
import axios from "axios";
import API_BASE_URL from "../../../../config";

const ListItem = ({ data, handleDelete }) => {
    const { id, image, title, content, created_at } = data;

    const formatTime = (time) => {
        const date = new Date(time);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${hours}:${minutes} ${day}/${month}/${year}`;
    };

    const truncateText = (text, limit) => {
        if (text.length > limit) {
            return text.substring(0, limit) + "...";
        }
        return text;
    };

    return (
        <div className="item cursor" onClick={() => handleDelete(data)}>
            <img src={API_BASE_URL + image} alt={title} />
            <div className="card-content d-flex flex-column">
                <h3>{title}</h3>
                <p>{truncateText(content, 150)}</p>
                <p className="time text-end">{formatTime(created_at)}</p>
            </div>
        </div>
    );
};

const ListNews = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [deleteNew, setDeleteNew] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/news/getAll`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (Array.isArray(response.data.result)) {
                    setData(response.data.result);
                } else {
                    console.error("Dữ liệu không đúng định dạng:", response.data);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchData();
    }, []);

    // Tính toán dữ liệu cho trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Tạo danh sách số trang
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const deleteElement = async (news) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/news/delete/${news.id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data.code === 1000) {
                setData((prevData) => prevData.filter((item) => item.id !== news.id));
                setDeleteNew(null);
                alert("Xóa tin thành công!");
            } else {
                console.error("Lỗi khi xóa tin:", response.data);
            }
        } catch (error) {
            alert("Xóa tin thất bại!");
            console.error("Lỗi khi xóa tin:", error);
        }
    };

    return (
        <div>
            <div className="list-news">
                {currentItems.length > 0 ? (
                    currentItems.map((news) => (
                        <ListItem key={news.id} data={news} handleDelete={setDeleteNew} />
                    ))
                ) : (
                    <p>Không có bản tin nào</p>
                )}
            </div>

            {/* Modal xác nhận */}
            {deleteNew && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Bạn có chắc muốn xóa tin này không?</h3>
                        <div className="modal-buttons">
                            <button className="confirm delete-button" style={{padding: "0 20px",  marginRight: "10px"}} onClick={() => deleteElement(deleteNew)}>
                                Có
                            </button>
                            <button className="cancel closed-button" onClick={() => setDeleteNew(null)}>
                                Không
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Điều hướng phân trang */}
            <div className="pagination">
                <button className="" onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Trang trước
                </button>
                <span>
                    Trang {currentPage} / {totalPages}
                </span>
                <button className="" onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Trang sau
                </button>
            </div>
        </div>
    );
};

export default ListNews;
