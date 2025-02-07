// Profile.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // สร้างไฟล์ CSS สำหรับจัดรูปแบบ

const Profile = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // ลบโทเค็นออกจาก localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // เปลี่ยนเส้นทางไปที่หน้า login
        navigate('/');
    };

    //const handleEditProfile = () => {
    //    navigate('/edit-profile');
    //};

    const handleBack = () => {
        navigate('/main'); // ย้อนกลับไปยังหน้าก่อนหน้า
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-icon">
                    <img src="/profile-icon.png" alt="Profile" className="icon" />
                </div>
                <button className="logout-button" onClick={handleLogout}>
                    ออกจากระบบ 
                </button>
                <button className="back-button" onClick={handleBack}>
                    ย้อนกลับ
                </button>
            </div>
        </div>
    );
};

export default Profile;
