import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderAdmin.css';

const HeaderAdmin = () => {
    const navigate = useNavigate();

    // ฟังก์ชันการไปหน้าโปรไฟล์ของแอดมิน
    const goToAdminProfile = () => {
        navigate('/Admin'); // เปลี่ยนเส้นทางไปยังหน้าโปรไฟล์แอดมิน
    };

    // ฟังก์ชันการออกจากระบบ
    const handleLogout = () => {
        // การลบข้อมูลที่เก็บใน localStorage หรือการ logout
        localStorage.removeItem('role');
        navigate('/login'); // นำทางไปที่หน้า login
    };

    return (
        <header className="header-admin">
            <div className="header-content">
                <div className="nav-links">
                    <a href="/AdminDashboard">สมาชิกไม่มาตามคิว</a> {/* หน้าแดชบอร์ดแอดมิน */}
                    <a href="/PortfolioListAdmin">โปรโมชั่น</a>  {/* หน้าเพิ่ม/แก้ไขผลงาน */}
                </div>
                <div className="profile-f" onClick={goToAdminProfile}>
                    <img src="/profile-icon.png" alt="Admin Profile" className="icon" />
                    <span>แอดมิน</span>
                </div>
                <button className="logout-btn" onClick={handleLogout}>ออกจากระบบ</button>
            </div>
        </header>
    );
};

export default HeaderAdmin;
