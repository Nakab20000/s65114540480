import React, { useEffect, useState } from "react";
import "./PortfolioList.css";
import Header from "./Header";

const PortfolioList = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPortfolios();
    }, []);

    const fetchPortfolios = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/portfolios/");
            if (!response.ok) throw new Error("ไม่สามารถโหลดข้อมูล Portfolio ได้");

            const data = await response.json();
            setPortfolios(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>⏳ กำลังโหลด...</div>;
    if (error) return <div style={{ color: "red" }}>❌ {error}</div>;

    return (
        <div className="home-container6">
            <Header />
            <h2 className="portfolio-title6">✨ ผลงานของเรา ✂️</h2>
            <div className="portfolio-list6">
                {portfolios.length > 0 ? (
                    portfolios.map((portfolio) => (
                        <div key={portfolio.id} className="portfolio-item6">
                            <h3 className="portfolio-item-title6">{portfolio.title}</h3>
                            <p className="portfolio-item-description6">{portfolio.description}</p>
                            <div className="portfolio-images6">
                                <img src={portfolio.image1 || "/images/default-image.jpg"} alt={portfolio.title} className="portfolio-image6" />
                                <img src={portfolio.image2 || "/images/default-image.jpg"} alt={portfolio.title} className="portfolio-image6" />
                                <img src={portfolio.image3 || "/images/default-image.jpg"} alt={portfolio.title} className="portfolio-image6" />
                                <img src={portfolio.image4 || "/images/default-image.jpg"} alt={portfolio.title} className="portfolio-image6" />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-portfolio6">❌ ยังไม่มีผลงาน</p>
                )}
            </div>
        </div>
    );
};

export default PortfolioList;
