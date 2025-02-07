// Header1.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header1.css';

const Header1 = () => {
    const navigate = useNavigate();

    const goToProfile = () => {
        navigate('/profile'); // เปลี่ยนเส้นทางไปยังหน้าโปรไฟล์
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="nav-links">
                    <a href="/main">หน้าหลัก</a> {/* เปลี่ยนจาก "หน้าแรก" เป็น "หน้าหลัก" */}
                    <a href="/main/Memberbooking">จองคิว</a> 
                    <a href="/main/PortfolioListMember">ผลงาน</a> 
                    <a href="/main/PortfolioListMember">รีวิว</a> 
                    <a href="/main/PortfolioListMember">โปรโมชั่น</a> 
                </div>
                <div className="profile-f" onClick={goToProfile}>
                    <img src="/profile-icon.png" alt="Profile" className="icon" />
                </div>
            </div>
        </header>
    );
};

export default Header1;
