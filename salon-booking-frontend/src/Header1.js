import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header1.css';

const Header1 = () => {
    const navigate = useNavigate();
    const [profileImageUrl, setProfileImageUrl] = useState('/default-profile.png'); // รูปเริ่มต้น

    useEffect(() => {
        fetchProfileImage();
    }, []);

    const fetchProfileImage = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch("http://127.0.0.1:8000/api/profile/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                console.error("❌ ไม่สามารถโหลดรูปโปรไฟล์ได้:", response.status, response.statusText);
                return;
            }

            const data = await response.json();

            if (data.profile_image) {
                const imageUrl = data.profile_image.startsWith("http")
                    ? data.profile_image
                    : `http://127.0.0.1:8000${data.profile_image}`;

                console.log("✅ URL รูปโปรไฟล์ใน Header:", imageUrl);
                setProfileImageUrl(imageUrl);
            } else {
                console.warn("⚠️ ไม่มีรูปโปรไฟล์, ใช้รูปเริ่มต้น");
            }
        } catch (error) {
            console.error("❌ Error fetching profile image:", error);
        }
    };

    const goToProfile = () => {
        navigate('/main/profile');
    };

    return (
        <header className="header5">
            <div className="header-content5">
                <div className="nav-links5">
                    <a href="/main">หน้าหลัก</a>
                    <a href="/main/Memberbooking">จองคิว</a> 
                    <a href="/main/PortfolioListMember">ผลงาน</a> 
                    <a href="/main/reviews">รีวิว</a> 
                    <a href="/main/promotions">โปรโมชั่น</a> 
                </div>
                <div className="profile5" onClick={goToProfile}>
                    <img src={profileImageUrl} alt="Profile" className="icon5" />
                </div>
            </div>
        </header>
    );
};

export default Header1;
