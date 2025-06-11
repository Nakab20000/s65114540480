import React, { useState, useEffect } from "react";
import Header from "./Header"; // ✅ นำเข้า Header
import "./ReviewsPage.css"; // ✅ ใช้ CSS สำหรับการจัดรูปแบบ

const ReviewsPage = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/reviews/");
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
        <div className="reviews-page1">
            <Header />
            <div className="reviews-container1">
                <h2>⭐ รีวิวจากผู้ใช้งาน</h2>
                {reviews.length > 0 ? (
                    <div className="reviews-list1">
                        {reviews.map((review) => (
                            <div key={review.id} className="review-card1">
                                <p className="review-text1">💬 "{review.review_text}"</p>
                                <p className="review-rating1">⭐ คะแนน: {review.rating}/5</p>
                                <p className="review-user1">👤 โดย: {review.username}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-reviews1">❌ ยังไม่มีรีวิว</p>
                )}
            </div>
        </div>
    );
};

export default ReviewsPage;
