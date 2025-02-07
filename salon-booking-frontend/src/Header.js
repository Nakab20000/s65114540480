import React from 'react';
import './Header.css'; // นำเข้าไฟล์ CSS สำหรับ Header

const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                <div className="logo-section">
                    
                    <div className="salon-name">
                        <h1>ระบบจองคิวร้านตัดผม</h1>
                    </div>
                </div>
                <nav className="nav-links">
                    <a href="/">หน้าแรก</a>
                    <a href="/login">เข้าสู่ระบบ</a>
                    <a href="/portfolio" className="register-link">ผลงาน</a>
                    <a href="/booking">จองคิว</a>
                    <a href="/reviews">รีวิว</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
