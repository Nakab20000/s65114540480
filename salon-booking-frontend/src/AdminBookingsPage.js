import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css"; // ใช้ CSS สำหรับแอดมิน
import HeaderAdmin from "./HeaderAdmin";

const AdminBookingsPage = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== "admin") {
            navigate("/login");
        } else {
            fetchBookings(); // ดึงข้อมูลการจอง
        }
    }, [navigate]);

    // ✅ ดึงข้อมูลการจองจาก API
    const fetchBookings = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            
            if (!accessToken) {
                alert("Session หมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง!");
                navigate("/login"); // ส่งกลับไปที่หน้า Login
                return;
            }
    
            const response = await fetch("http://127.0.0.1:8000/api/bookings/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`, // ✅ ใส่ Token
                },
            });
    
            if (response.status === 401) {
                alert("Session หมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง!");
                localStorage.removeItem("accessToken"); // เคลียร์ token
                navigate("/login"); // ไปหน้า Login
                return;
            }
    
            if (!response.ok) {
                throw new Error("ไม่สามารถดึงข้อมูลการจองได้");
            }
    
            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        } finally {
            setLoading(false);
        }
    };
    

    // ✅ อัปเดตสถานะการจอง
    const handleUpdateBookingStatus = async (bookingId, newStatus) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch(`http://127.0.0.1:8000/api/booking/update-status/${bookingId}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error("Failed to update booking status.");
            }

            alert(`อัปเดตสถานะเป็น ${newStatus} สำเร็จ!`);
            fetchBookings(); // ✅ รีโหลดข้อมูลใหม่
        } catch (error) {
            alert("เกิดข้อผิดพลาด: " + error.message);
        }
    };

    if (loading) return <p>⏳ กำลังโหลดข้อมูล...</p>;
    if (error) return <p style={{ color: "red" }}>❌ เกิดข้อผิดพลาด: {error}</p>;

    return (
        <div className="admin-page">
            <HeaderAdmin />

            <div className="content">
                <h2>📅 จัดการข้อมูลการจอง</h2>
                <table className="booking-table">
                    <thead>
                        <tr>
                            <th>วันที่</th>
                            <th>เวลา</th>
                            <th>ลูกค้า</th>
                            <th>ทรงผม</th>
                            <th>สถานะ</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.booking_id}>
                                <td>{booking.booking_date}</td>
                                <td>{booking.booking_time}</td>
                                <td>{booking.user.username}</td>
                                <td>{booking.hair_style}</td>
                                <td className={`status-${booking.status}`}>{booking.status}</td>
                                <td>
                                    {booking.status === "รออนุมัติ" && (
                                        <>
                                            <button
                                                className="approve-btn"
                                                onClick={() => handleUpdateBookingStatus(booking.booking_id, "อนุมัติ")}
                                            >
                                                ✅ อนุมัติ
                                            </button>
                                            <button
                                                className="cancel-btn"
                                                onClick={() => handleUpdateBookingStatus(booking.booking_id, "ยกเลิก")}
                                            >
                                                ❌ ยกเลิก
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminBookingsPage;
