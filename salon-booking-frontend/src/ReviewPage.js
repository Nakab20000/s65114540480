import React from "react";
import Header from "./Header"; // นำเข้า Header
import "./ReviewPage.css";

const reviews = [
    { id: 1, user: "ผู้ใช้ 1", rating: 5, comment: "รีวิวดีมากค่ะ ช่างบริการดี" },
    { id: 2, user: "ผู้ใช้ 2", rating: 3, comment: "บริการโอเค แต่ต้องรอนาน" },
    { id: 3, user: "ผู้ใช้ 3", rating: 2, comment: "ไม่ประทับใจเลยค่ะ" },
];

const ReviewPage = () => {
    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <span key={index} className={index < rating ? "star-filled" : "star-empty"}>
                ★
            </span>
        ));
    };

    return (
        <div className="review-page">
            {/* เพิ่ม Header */}
            <Header />

            <h1 className="title">รีวิวจากลูกค้า</h1>
            <div className="reviews-container">
                {reviews.map((review) => (
                    <div key={review.id} className="review-card">
                        <div className="review-avatar">
                            <img src="/default-avatar.png" alt="Avatar" />
                        </div>
                        <div className="review-content">
                            <div className="review-rating">{renderStars(review.rating)}</div>
                            <p className="review-comment">{review.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewPage;
