import React, { useState, useEffect } from "react";
import Header1 from "./Header1"; // ✅ นำเข้า Header1
import "./MemberReviewsPage.css"; // ✅ ใช้ CSS สำหรับการจัดรูปแบบ

const MemberReviewsPage = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                const response = await fetch("http://127.0.0.1:8000/api/reviews/", {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                if (!response.ok) throw new Error("ไม่สามารถโหลดรีวิวได้");
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error("❌ Error fetching reviews:", error);
            }
        };
        fetchReviews();
    }, []);

    return (
        <div className="reviews-page">
            <Header1 /> {/* ✅ ใส่ Header1 */}
            <div className="reviews-container">
                <h2>⭐ รีวิวของสมาชิก</h2>
                {reviews.length > 0 ? (
                    <div className="reviews-list">
                        {reviews.map((review) => (
                            <div key={review.id} className="review-card">
                                <p className="review-text">💬 "{review.review_text}"</p>
                                <p className="review-rating">⭐ คะแนน: {review.rating}/5</p>
                                <p className="review-user">👤 โดย: {review.username}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-reviews">❌ ยังไม่มีรีวิว</p>
                )}
            </div>
        </div>
    );
};

export default MemberReviewsPage;
