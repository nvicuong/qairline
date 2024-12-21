import React from "react";
import "./CardProfile.scss";


const CardProfile = ({ users }) => {
    return (
        <div className="card-profile-custom">
            <div className="banner">
                <img
                    src="https://cdn-media.sforum.vn/storage/app/media/Van%20Pham/7/hinh-nen-desktop-32.jpg"
                    alt="User banner"
                    className="banner-image"
                />
            </div>

            <div className="profile-header">
                <div className="avatar">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9MJBZPGpg-6lhh_hQtsvbDm_Z9OFc8uCSiw&s"
                        alt="User avatar"
                    />
                </div>
                <div className="basic-info">
                    <h2>Tên: {users.full_name}</h2>
                    <p>Username: {users.username}</p>
                </div>
            </div>
        </div>
    )
}

export default CardProfile;