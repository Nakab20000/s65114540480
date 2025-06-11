import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";
import HeaderAdmin from "./HeaderAdmin";

const AdminBookingsPage = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cancelReasons, setCancelReasons] = useState({});

    // ✅ ดึงข้อมูลการจองทั้งหมด
    const fetchBookings = useCallback(async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                alert("Session หมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง!");
                navigate("/login");
                return;
            }

            const response = await fetch("http://127.0.0.1:8000/api/all-bookings/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error("ไม่สามารถดึงข้อมูลการจองได้");
            }

            const data = await response.json();
            setBookings(data);
        } catch (error) {
            setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    // ✅ เรียงข้อมูลตามวันที่และเวลา (ล่าสุดอยู่ข้างบน)
    const sortedBookings = [...bookings].sort((a, b) => {
        const dateA = new Date(`${a.booking_date} ${a.booking_time}`);
        const dateB = new Date(`${b.booking_date} ${b.booking_time}`);
        return dateB - dateA; // เรียงจากใหม่ไปเก่า
    });

    // ✅ อัปเดตสถานะการจอง
    const handleUpdateStatus = async (bookingId, newStatus) => {
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

            alert(`✅ อัปเดตสถานะเป็น "${newStatus}" สำเร็จ!`);
            fetchBookings();
        } catch (error) {
            alert("❌ เกิดข้อผิดพลาด: " + error.message);
        }
    };

    // ✅ อัปเดตเหตุผลการยกเลิก
    const handleConfirmCancel = async (bookingId) => {
        const reason = cancelReasons[bookingId] || "";
        if (!reason) {
            alert("⚠ กรุณากรอกเหตุผลในการยกเลิก");
            return;
        }

        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch(`http://127.0.0.1:8000/api/booking/update-status/${bookingId}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ status: "แอดมินยกเลิก", reason }),
            });

            if (!response.ok) {
                throw new Error("Failed to cancel booking.");
            }

            alert("✅ ยกเลิกการจองสำเร็จ!");
            fetchBookings();
            setCancelReasons((prev) => {
                const updated = { ...prev };
                delete updated[bookingId];
                return updated;
            });
        } catch (error) {
            alert("❌ เกิดข้อผิดพลาด: " + error.message);
        }
    };

    const handleCancelInput = (bookingId) => {
        setCancelReasons((prev) => {
            const updated = { ...prev };
            delete updated[bookingId];
            return updated;
        });
    };

    if (loading) return <p>⏳ กำลังโหลดข้อมูล...</p>;
    if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

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
                            <th>เหตุผลยกเลิก</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedBookings.map((booking) => (
                            <tr key={booking.booking_id}>
                                <td>{booking.booking_date}</td>
                                <td>{booking.booking_time}</td>
                                <td>{booking.user.username}</td>
                                <td>{booking.hair_style}</td>
                                <td className={`status-${booking.status}`}>{booking.status}</td>
                                <td>
                                    {booking.status === "ผู้ใช้ยกเลิก" || booking.status === "แอดมินยกเลิก"
                                        ? booking.cancel_reason || "ไม่มีเหตุผล"
                                        : "-"}
                                </td>
                                <td>
                                    {booking.status === "จองสำเร็จ" && cancelReasons[booking.booking_id] === undefined && (
                                        <button
                                            className="complete-btn"
                                            onClick={() => handleUpdateStatus(booking.booking_id, "เสร็จสิ้น")}
                                        >
                                            ✅ เสร็จสิ้น
                                        </button>
                                    )}

                                    {booking.status === "จองสำเร็จ" && (
                                        cancelReasons[booking.booking_id] === undefined ? (
                                            <button
                                                className="cancel-btn"
                                                onClick={() => setCancelReasons({ ...cancelReasons, [booking.booking_id]: "" })}
                                            >
                                                ❌ ยกเลิก
                                            </button>
                                        ) : (
                                            <div>
                                                <input
                                                    type="text"
                                                    placeholder="กรอกเหตุผล..."
                                                    value={cancelReasons[booking.booking_id]}
                                                    onChange={(e) => setCancelReasons({
                                                        ...cancelReasons,
                                                        [booking.booking_id]: e.target.value,
                                                    })}
                                                />
                                                <button
                                                    className="confirm-btn"
                                                    onClick={() => handleConfirmCancel(booking.booking_id)}
                                                >
                                                    ✅ ยืนยัน
                                                </button>
                                                <button
                                                    className="cancel-btn"
                                                    onClick={() => handleCancelInput(booking.booking_id)}
                                                >
                                                    ❌ ยกเลิก
                                                </button>
                                            </div>
                                        )
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