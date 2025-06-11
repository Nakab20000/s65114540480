import React, { useEffect, useState } from 'react';
import authService from './authService'; 
import './PortfolioListMember.css'; // ✅ ใช้ CSS ที่ปรับใหม่
import Header1 from './Header1';

const PortfolioListMember = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPortfolios = () => {
            authService.getPortfolios()
                .then(response => {
                    setPortfolios(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("There was an error!", error);
                    setLoading(false);
                });
        };

        fetchPortfolios();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="home-container-member">
            <Header1 /> 
            <h2 className="portfolio-title-member">📸 ผลงานของเรา</h2>
            {portfolios.length === 0 ? (
                <div className="no-portfolio-member">ยังไม่มีผลงาน</div>
            ) : (
                <div className="portfolio-list-member">
                    {portfolios.map((portfolio) => (
                        <div key={portfolio.id} className="portfolio-item-member">
                            <h3 className="portfolio-item-title-member">{portfolio.title}</h3>
                            <p className="portfolio-item-description-member">{portfolio.description}</p>
                            <div className="portfolio-images-member">
                                <img src={portfolio.image1} alt={`1 ${portfolio.title}`} className="portfolio-image-member" />
                                <img src={portfolio.image2} alt={`2 ${portfolio.title}`} className="portfolio-image-member" />
                                <img src={portfolio.image3} alt={`3 ${portfolio.title}`} className="portfolio-image-member" />
                                <img src={portfolio.image4} alt={`4 ${portfolio.title}`} className="portfolio-image-member" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PortfolioListMember;
