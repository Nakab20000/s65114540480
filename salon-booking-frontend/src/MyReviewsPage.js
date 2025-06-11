import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyReviewsPage.css";

const MyReviewsPage = () => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserReviews = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                if (!accessToken) {
                    alert("Session หมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง!");
                    navigate("/login");
                    return;
                }

                const response = await fetch("http://127.0.0.1:8000/api/my-reviews/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("ไม่สามารถดึงข้อมูลรีวิวได้");
                }

                const data = await response.json();
                setReviews(data);
            } catch (error) {
                setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
            } finally {
                setLoading(false);
            }
        };

        fetchUserReviews();
    }, [navigate]);

    if (loading) return <p>⏳ กำลังโหลดข้อมูล...</p>;
    if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

    return (
        <div className="my-reviews-page">
            <h2>⭐ รีวิวของฉัน</h2>
            {reviews.length === 0 ? (
                <p>📌 คุณยังไม่มีรีวิว</p>
            ) : (
                <div className="reviews-container">
                    {reviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <p className="review-date">📅 วันที่: {review.created_at}</p>
                            <p className="review-rating">⭐ {review.rating} ดาว</p>
                            <p className="review-text">💬 {review.review_text}</p>
                        </div>
                    ))}
                </div>
            )}
            <button className="back-btn" onClick={() => navigate("/main")}>🔙 กลับหน้าหลัก</button>
        </div>
    );
};

export default MyReviewsPage;
