// HairstyleDetails.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Home.css'; // ใช้ CSS เดียวกันสำหรับการตกแต่ง

const HairstyleDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const hairstyles = [
        { id: 1, name: 'Two Block', description: 'ทรงผมยอดฮิตเหมาะกับวัยรุ่น', image: '/images/two-block.jpg' },
        { id: 2, name: 'Mullet', description: 'ทรงผมย้อนยุคที่กลับมาได้รับความนิยมอีกครั้ง', image: '/images/mullet.jpg' },
        // เพิ่มทรงผมอื่นๆ ที่เหลือตามที่ต้องการ
    ];

    const hairstyle = hairstyles.find((style) => style.id === parseInt(id));

    if (!hairstyle) {
        return <div>ไม่พบทรงผมที่คุณเลือก</div>;
    }

    return (
        <div className="hairstyle-details-container">
            <div className="details-content">
                <img 
                    src={hairstyle.image} 
                    alt={hairstyle.name} 
                    className="details-image"
                />
                <h2>{hairstyle.name}</h2>
                <p>{hairstyle.description}</p>
                <button 
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    กดกลับ
                </button>
            </div>
        </div>
    );
};

export default HairstyleDetails;
