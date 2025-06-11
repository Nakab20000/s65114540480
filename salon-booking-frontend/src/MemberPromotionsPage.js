import React, { useState, useEffect } from "react";
import Header1 from "./Header1";
import "./MemberPromotionsPage.css";

const MemberPromotionsPage = () => {
    const [promotions, setPromotions] = useState([]);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/promotions/");
                if (!response.ok) throw new Error("โหลดโปรโมชั่นไม่สำเร็จ");
                const data = await response.json();
                setPromotions(data);
            } catch (error) {
                console.error("❌ Error fetching promotions:", error);
            }
        };
        fetchPromotions();
    }, []);

    return (
        <div className="promotions-page4">
            <Header1 />
            <h2>🎉 โปรโมชั่นสำหรับสมาชิก</h2>
            <div className="promotions-list4">
                {promotions.length > 0 ? (
                    promotions.map((promo) => (
                        <div key={promo.promotion_id} className="promotion-card4">
                            <h3>{promo.name}</h3>
                            <p>{promo.description}</p>
                            <p>🔖 ส่วนลด: {promo.discount_amount} {promo.discount_type === "percent" ? "%" : "บาท"}</p>
                            <p>📅 ใช้ได้ถึง: {promo.end_date}</p>
                        </div>
                    ))
                ) : (
                    <p>❌ ไม่มีโปรโมชั่นขณะนี้</p>
                )}
            </div>
        </div>
    );
};

export default MemberPromotionsPage;
