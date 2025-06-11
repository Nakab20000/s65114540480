import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
    const navigate = useNavigate();
    const [noShowCount, setNoShowCount] = useState(0);
    const [profileImageUrl, setProfileImageUrl] = useState("");

    useEffect(() => {
        fetchProfileData();
        fetchNoShowCount();
    }, []);

    const fetchProfileData = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch("http://127.0.0.1:8000/api/profile/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                console.error("❌ ไม่สามารถโหลดข้อมูลโปรไฟล์ได้:", response.status, response.statusText);
                return;
            }

            const data = await response.json();
            console.log("✅ ข้อมูลโปรไฟล์ที่ได้รับ:", data);

            if (data.profile_image) {
                const imageUrl = data.profile_image.startsWith("http")
                    ? data.profile_image
                    : `http://127.0.0.1:8000${data.profile_image}`;

                console.log("✅ URL รูปภาพโปรไฟล์ที่แก้ไข:", imageUrl);
                setProfileImageUrl(imageUrl);
            } else {
                console.warn("⚠️ ไม่มีรูปภาพโปรไฟล์, ใช้รูปเริ่มต้นแทน");
                setProfileImageUrl("/default-profile.png");
            }
        } catch (error) {
            console.error("❌ Error fetching profile data:", error);
        }
    };

    const fetchNoShowCount = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch("http://127.0.0.1:8000/api/member/no-show-count/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) throw new Error("ไม่สามารถโหลดข้อมูล No-Show ได้");

            const data = await response.json();
            console.log("✅ จำนวน No-Show ที่ได้รับ:", data.count);
            setNoShowCount(data.count);
        } catch (error) {
            console.error("❌ Error fetching no-show count:", error);
        }
    };

    const handleViewNoShowDetails = () => {
        navigate("/main/my-no-show");
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/");
    };

    const handleEditProfile = () => {
        navigate("/edit-profile");
    };

    const handleViewBookings = () => {
        navigate("/member-bookings");
    };

    const handleViewMyReviews = () => {
        navigate("/my-reviews");
    };

    const handleBack = () => {
        navigate("/main");
    };

    return (
        <div className="profile-container1">
            <div className="profile-card1">
                <div className="profile-icon1">
                    <img src={profileImageUrl} alt="Profile" className="icon1" onError={() => console.error("❌ ไม่สามารถโหลดรูปภาพได้:", profileImageUrl)} />
                </div>

                <div className="no-show-section1">
                    <p className="no-show-text1">
                        ❌ ไม่มาตามคิว: <span className="no-show-count1">{noShowCount}</span> ครั้ง
                    </p>
                    <button className="no-show-btn1" onClick={handleViewNoShowDetails}>
                        ดูรายละเอียด
                    </button>
                </div>

                <h2>👤 ข้อมูลส่วนตัว</h2>

                <button className="profile-button1" onClick={handleEditProfile}>
                    ✏️ แก้ไขข้อมูลส่วนตัว
                </button>

                <button className="profile-button1" onClick={handleViewBookings}>
                    📅 ดูคิวของฉัน
                </button>

                <button className="profile-button1" onClick={handleViewMyReviews}>
                    ⭐ รีวิวของฉัน
                </button>

                <button className="logout-button1" onClick={handleLogout}>
                    🚪 ออกจากระบบ
                </button>

                <button className="back-button1" onClick={handleBack}>
                    🔙 ย้อนกลับ
                </button>
            </div>
        </div>
    );
};

export default Profile;
