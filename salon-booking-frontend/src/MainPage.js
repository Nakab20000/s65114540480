import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header1 from './Header1';
import './MainPage.css';

const MainPage = () => {
    const navigate = useNavigate();
    const [hairstyles, setHairstyles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            navigate('/login');
        } else {
            fetchHairstyles();
        }
    }, [navigate]);

    const fetchHairstyles = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/hairstyles/");
            if (!response.ok) throw new Error("ไม่สามารถโหลดข้อมูลทรงผมได้");

            const data = await response.json();
            setHairstyles(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCardClick = (id) => {
        navigate(`/hairstyle/${id}`);
    };

    return (
        <div className="home-container3">
            <Header1 />
            <div className="hero-section3">
                <h2 className="main-title3">ระบบจองคิวร้านตัดผม</h2>
                <div className="booking-buttons3">
                    <a href="/main/Memberbooking" className="booking-button3">จองคิวล่วงหน้า</a>
                    <a href="/main/Memberbooking" className="booking-button3">จองคิวเลย</a>
                </div>
            </div>
            <div className="info-section3">
                <h3>ทรงผมแนะนำ</h3>

                {loading ? (
                    <p>⏳ กำลังโหลดข้อมูล...</p>
                ) : error ? (
                    <p style={{ color: "red" }}>❌ {error}</p>
                ) : (
                    <div className="hairstyle-list3">
                        {hairstyles.length > 0 ? (
                            hairstyles.map((style) => (
                                <div
                                    key={style.id}
                                    className="hairstyle-card3"
                                    onClick={() => handleCardClick(style.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img
                                        src={style.image || "/images/default-haircut.jpg"}
                                        alt={style.name}
                                        className="hairstyle-image3"
                                    />
                                    <h4>{style.name}</h4>
                                </div>
                            ))
                        ) : (
                            <p>❌ ไม่มีทรงผมแนะนำ</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainPage;
