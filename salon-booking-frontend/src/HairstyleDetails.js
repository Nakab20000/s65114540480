import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./HairstyleDetail.css"; // ใช้ CSS เดียวกัน

const HairstyleDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hairstyle, setHairstyle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHairstyleDetail = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/hairstyles/${id}/`);
                if (!response.ok) throw new Error("โหลดข้อมูลไม่สำเร็จ");

                const data = await response.json();
                setHairstyle(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHairstyleDetail();
    }, [id]); // ✅ ใส่ id เป็น dependency

    if (loading) return <p>⏳ กำลังโหลดข้อมูล...</p>;
    if (error) return <p style={{ color: "red" }}>❌ {error}</p>;
    if (!hairstyle) return <p>❌ ไม่พบทรงผมที่คุณเลือก</p>;

    return (
        <div className="hairstyle-details-container">
            <div className="details-content">
                <img 
                    src={hairstyle.image || "/images/default-haircut.jpg"} 
                    alt={hairstyle.name} 
                    className="details-image"
                />
                <h2>{hairstyle.name}</h2>
                <p>{hairstyle.description}</p>
                <p><strong>ราคา:</strong> {hairstyle.price} บาท</p>

                <button 
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    🔙 กลับ
                </button>
            </div>
        </div>
    );
};

export default HairstyleDetails;
