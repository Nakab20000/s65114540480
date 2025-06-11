import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPromotionsPage.css"; 

const AdminPromotionsPage = () => {
    const navigate = useNavigate();
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPromotions();
    }, []);

    const fetchPromotions = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch("http://127.0.0.1:8000/api/admin/promotions/", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) throw new Error("ไม่สามารถโหลดข้อมูลโปรโมชั่นได้");
            const data = await response.json();
            setPromotions(data);
        } catch (error) {
            setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        } finally {
            setLoading(false);
        }
    };

    const handleCancelPromotion = async (promotionId) => {
        const confirmCancel = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการยกเลิกโปรโมชั่นนี้?");
        if (!confirmCancel) return;

        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch(`http://127.0.0.1:8000/api/admin/promotions/${promotionId}/cancel/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) throw new Error("ไม่สามารถยกเลิกโปรโมชั่นได้");
            
            alert("✅ ยกเลิกโปรโมชั่นสำเร็จ!");
            fetchPromotions(); // โหลดข้อมูลใหม่
        } catch (error) {
            alert("❌ เกิดข้อผิดพลาด: " + error.message);
        }
    };

    if (loading) return <p>⏳ กำลังโหลดข้อมูล...</p>;
    if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

    return (
        <div className="admin-promotions-page">
            <h2>🎉 รายการโปรโมชั่น</h2>

            <table className="promotions-table">
                <thead>
                    <tr>
                        <th>ชื่อโปรโมชั่น</th>
                        <th>ส่วนลด</th>
                        <th>วันที่เริ่ม</th>
                        <th>วันที่สิ้นสุด</th>
                        <th>สถานะ</th>
                        <th>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {promotions.map((promotion) => (
                        <tr key={promotion.promotion_id}>
                            <td>{promotion.name}</td>
                            <td>
                                {promotion.discount_type === "percent"
                                    ? `${promotion.discount_amount}%`
                                    : `${promotion.discount_amount} บาท`}
                            </td>
                            <td>{promotion.start_date}</td>
                            <td>{promotion.end_date}</td>
                            <td className={promotion.is_active ? "active" : "canceled"}>
                                {promotion.is_active ? "✅ ใช้งานได้" : "❌ ยกเลิกแล้ว"}
                            </td>
                            <td>
                                {promotion.is_active && (
                                    <button
                                        className="cancel-btn"
                                        onClick={() => handleCancelPromotion(promotion.promotion_id)}
                                    >
                                        ❌ ยกเลิกโปรโมชั่น
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="back-btn" onClick={() => navigate("/admin")}>
                🔙 ย้อนกลับ
            </button>
        </div>
    );
};

export default AdminPromotionsPage;
