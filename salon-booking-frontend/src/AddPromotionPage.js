import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddPromotionPage.css";

const AddPromotionPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [discountAmount, setDiscountAmount] = useState("");
    const [discountType, setDiscountType] = useState("amount");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const accessToken = localStorage.getItem("accessToken");

            const response = await fetch("http://127.0.0.1:8000/api/admin/promotions/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    name,
                    description,
                    discount_amount: parseFloat(discountAmount),
                    discount_type: discountType,
                    start_date: startDate,
                    end_date: endDate,
                    is_active: true,
                    status: "created", // ✅ เพิ่มสถานะ 'created'
                }),
            });

            if (!response.ok) throw new Error("เพิ่มโปรโมชั่นไม่สำเร็จ");

            alert("✅ โปรโมชั่นถูกเพิ่มแล้ว!");
            navigate("/admin/promotions");
        } catch (error) {
            alert("❌ เกิดข้อผิดพลาด: " + error.message);
        }
    };

    return (
        <div className="promotion-form">
            <h2>✨ เพิ่มโปรโมชั่นใหม่</h2>
            <form onSubmit={handleSubmit}>
                <label>ชื่อโปรโมชั่น:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label>คำอธิบาย:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>จำนวนส่วนลด:</label>
                <input
                    type="number"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(e.target.value)}
                    required
                />

                <label>ประเภทส่วนลด:</label>
                <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                >
                    <option value="amount">บาท</option>
                    <option value="percent">เปอร์เซ็นต์</option>
                </select>

                <label>วันที่เริ่ม:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />

                <label>วันที่สิ้นสุด:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />

                <button type="submit">✅ เพิ่มโปรโมชั่น</button>
            </form>

            <button className="back-btn" onClick={() => navigate("/admin/promotions")}>
                🔙 ย้อนกลับ
            </button>
        </div>
    );
};

export default AddPromotionPage;
