import React, { useEffect, useState } from 'react';
import authService from './authService';  // ใช้ authService สำหรับการ login
import './PortfolioList.css';
import Header1 from './Header1'; // เปลี่ยนการนำเข้า Header เป็น Header1

const PortfolioList = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ฟังก์ชันดึงข้อมูลผลงานจาก API
        const fetchPortfolios = () => {
            authService.getPortfolios()
                .then(response => {
                    setPortfolios(response.data);  // เก็บข้อมูลผลงานลงใน state
                    setLoading(false);  // ปิด loading
                })
                .catch(error => {
                    console.error("There was an error!", error);
                    setLoading(false);
                });
        };

        fetchPortfolios();
    }, []);

    if (loading) {
        return <div>Loading...</div>;  // เมื่อข้อมูลยังไม่มา จะโชว์ข้อความ Loading
    }

    return (
        <div className="home-container">
            <Header1 /> 
            <h2>Our Portfolio</h2>
            <div className="portfolio-list">
                {portfolios.map((portfolio) => (
                    <div key={portfolio.id} className="portfolio-item">
                        <h3>{portfolio.title}</h3>
                        <p>{portfolio.description}</p>
                        <div className="portfolio-images">
                            <img src={portfolio.image1} alt={`1 ${portfolio.title}`} />
                            <img src={portfolio.image2} alt={`2 ${portfolio.title}`} />
                            <img src={portfolio.image3} alt={`3 ${portfolio.title}`} />
                            <img src={portfolio.image4} alt={`4 ${portfolio.title}`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PortfolioList;
