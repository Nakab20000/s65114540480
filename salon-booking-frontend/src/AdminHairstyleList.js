import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminHairstyleList.css"; // ใช้ไฟล์ CSS สำหรับตกแต่ง

const AdminHairstyleList = () => {
    const navigate = useNavigate();
    const [hairstyles, setHairstyles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ดึงข้อมูลทรงผมจาก API
    useEffect(() => {
        const fetchHairstyles = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/hairstyles/');
                if (!response.ok) throw new Error("ไม่สามารถโหลดข้อมูลทรงผมได้");
                const data = await response.json();
                setHairstyles(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHairstyles();
    }, []);

    if (loading) return <p>⏳ กำลังโหลดข้อมูล...</p>;
    if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

    return (
        <div className="admin-hairstyle-list">
            <h1>💇‍♂️ รายการทรงผม</h1>
            <button className="back-to-home" onClick={() => navigate("/admin")}>
                🏠 กลับไปหน้าแรก
            </button>

            <div className="hairstyles-container">
                {hairstyles.map((hairstyle) => (
                    <div key={hairstyle.id} className="hairstyle-card">
                        <img
                            src={hairstyle.image ? hairstyle.image : "/images/default-haircut.jpg"}
                            alt={hairstyle.name}
                            className="hairstyle-image"
                        />
                        <div className="hairstyle-info">
                            <h2>{hairstyle.name}</h2>
                            <p>💰 {hairstyle.price} บาท</p>
                            <button 
                                className="details-button"
                                onClick={() => navigate(`/admin/hairstyles/${hairstyle.id}`)}
                            >
                                🔍 ดูรายละเอียด
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminHairstyleList;
