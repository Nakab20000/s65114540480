// MainPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header1 from './Header1';
import './Home.css';

const MainPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            navigate('/login');
        }
    }, [navigate]);

    const recommendedHairstyles = [
        { id: 1, name: 'Two Block', description: 'ทรงผม Two Block', image: '/images/two-block.jpg' },
        { id: 2, name: 'Mullet', description: 'ทรงผม Mullet', image: '/images/mullet.jpg' },
        { id: 3, name: 'Comma Hair', description: 'ทรงผม Comma Hair', image: '/images/comma-hair.jpg' },
        { id: 4, name: 'Dandy Cut', description: 'ทรงผม Dandy Cut', image: '/images/two-block.jpg' },
        { id: 5, name: 'Messy Hair', description: 'ทรงผม Messy Hair', image: '/images/two-block.jpg' },
        { id: 6, name: 'Undercut', description: 'ทรงผม Undercut', image: '/images/two-block.jpg' },
        { id: 7, name: 'Pompadour', description: 'ทรงผม Pompadour', image: '/images/pompadour.jpg' },
        { id: 8, name: 'Crew Cut', description: 'ทรงผม Crew Cut', image: '/images/crew-cut.jpg' },
        { id: 9, name: 'Buzz Cut', description: 'ทรงผม Buzz Cut', image: '/images/buzz-cut.jpg' },
        { id: 10, name: 'Quiff', description: 'ทรงผม Quiff', image: '/images/quiff.jpg' },
        { id: 11, name: 'Faux Hawk', description: 'ทรงผม Faux Hawk', image: '/images/faux-hawk.jpg' },
        { id: 12, name: 'Caesar Cut', description: 'ทรงผม Caesar Cut', image: '/images/caesar-cut.jpg' },
        { id: 13, name: 'Ivy League', description: 'ทรงผม Ivy League', image: '/images/ivy-league.jpg' },
        { id: 14, name: 'Taper Fade', description: 'ทรงผม Taper Fade', image: '/images/taper-fade.jpg' },
        { id: 15, name: 'Bowl Cut', description: 'ทรงผม Bowl Cut', image: '/images/bowl-cut.jpg' }
    ];

    const handleCardClick = (id) => {
        navigate(`/hairstyle/${id}`); // ไปที่หน้ารายละเอียดทรงผม
    };

    return (
        <div className="home-container">
            <Header1 />
            <div className="hero-section">
                <h2 className="main-title">ระบบจองคิวร้านตัดผม</h2>
                <div className="booking-buttons">
                    <a href="/Memberbooking" className="booking-button">จองคิวล่วงหน้า</a>
                    <a href="/Memberbooking" className="booking-button">จองคิวเลย</a>
                </div>
            </div>
            <div className="info-section">
                <h3>ทรงผมแนะนำ</h3>
                <div className="hairstyle-list">
                    {recommendedHairstyles.map((style) => (
                        <div
                            key={style.id}
                            className="hairstyle-card"
                            onClick={() => handleCardClick(style.id)} // คลิกเพื่อไปที่หน้ารายละเอียด
                            style={{ cursor: 'pointer' }} // เพิ่ม cursor pointer เพื่อบอกว่าการ์ดคลิกได้
                        >
                            <img src={style.image} alt={style.name} />
                            <h4>{style.name}</h4>
                            <p>{style.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
