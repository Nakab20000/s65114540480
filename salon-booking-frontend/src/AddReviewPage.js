import React, { useState } from "react"; // ✅ เพิ่ม useState
import { useNavigate, useParams } from "react-router-dom"; // ✅ เพิ่ม useParams
import "./AddReviewPage.css";

const AddReviewPage = () => {
    const navigate = useNavigate();
    const { bookingId } = useParams(); // ✅ ดึง bookingId จาก path parameter

    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");

    const handleSubmitReview = async () => {
        if (!rating || !reviewText.trim()) {
            alert("⚠ กรุณาให้คะแนนและเขียนรีวิว");
            return;
        }

        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch(`http://127.0.0.1:8000/api/review/${bookingId}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    rating: rating,
                    review_text: reviewText,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit review.");
            }

            alert("✅ รีวิวของคุณถูกส่งเรียบร้อยแล้ว!");
            navigate("/my-reviews");
        } catch (error) {
            alert("❌ เกิดข้อผิดพลาด: " + error.message);
        }
    };

    return (
        <div className="review-page">
            <h2>✍ รีวิวการใช้บริการ</h2>
            <div className="review-container">
                <label>⭐ ให้คะแนน:</label>
                <div className="rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={star <= rating ? "star filled" : "star"}
                            onClick={() => setRating(star)}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <label>📝 แสดงความคิดเห็น:</label>
                <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="เขียนรีวิวของคุณ..."
                />

                <button className="submit-btn" onClick={handleSubmitReview}>
                    ✅ ส่งรีวิว
                </button>
            </div>

            <button className="back-btn" onClick={() => navigate("/member-bookings")}>
                🔙 กลับไปหน้าคิวของฉัน
            </button>
        </div>
    );
};

export default AddReviewPage;
