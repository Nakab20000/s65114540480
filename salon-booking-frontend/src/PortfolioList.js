import React, { useEffect, useState } from 'react';
import authService from './authService';  // ใช้ authService สำหรับการ login
import './PortfolioList.css';
import Header from './Header'; // เปลี่ยนการนำเข้า Header เป็น Header1

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
            <Header /> 
            <h2>Our Portfolio</h2>
            <div className="portfolio-list">
                {portfolios.map((portfolio) => (
                    <div key={portfolio.id} className="portfolio-item">
                        <h3>{portfolio.title}</h3>
                        <p>{portfolio.description}</p>
                        <div className="portfolio-images">
                            {portfolio.image1 && <img src={portfolio.image1} alt={portfolio.title} />}
                            {portfolio.image2 && <img src={portfolio.image2} alt={portfolio.title} />}
                            {portfolio.image3 && <img src={portfolio.image3} alt={portfolio.title} />}
                            {portfolio.image4 && <img src={portfolio.image4} alt={portfolio.title} />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PortfolioList;
