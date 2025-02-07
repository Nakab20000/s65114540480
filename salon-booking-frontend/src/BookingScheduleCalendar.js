import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./BookingScheduleCalendar.css";

const BookingScheduleCalendar = () => {
    const [bookings, setBookings] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedBookings, setSelectedBookings] = useState([]);
    const [cancelReason, setCancelReason] = useState("");

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch("http://127.0.0.1:8000/api/bookings/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch bookings.");
            }

            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const handleDateClick = (arg) => {
        const date = arg.dateStr;
        setSelectedDate(date);
        const filteredBookings = bookings.filter(booking => booking.booking_date === date);
        setSelectedBookings(filteredBookings);
    };

    const handleCancelBooking = async (bookingId) => {
        if (!cancelReason) {
            alert("กรุณากรอกเหตุผลการยกเลิก");
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
                body: JSON.stringify({ status: "canceled", reason: cancelReason }), // ✅ ส่งเหตุผลไปด้วย
            });

            if (!response.ok) {
                throw new Error("Failed to cancel booking.");
            }

            alert("ยกเลิกการจองสำเร็จ!");
            setCancelReason(""); // ✅ ล้างค่าหลังยกเลิกสำเร็จ
            fetchBookings(); // ✅ โหลดข้อมูลใหม่
        } catch (error) {
            console.error("Error canceling booking:", error);
            alert("เกิดข้อผิดพลาดในการยกเลิกการจอง");
        }
    };

    const events = bookings.map((booking) => ({
        title: `จองโดย ${booking.user?.username || "ไม่ทราบชื่อ"}`,
        start: booking.booking_date,
        backgroundColor: "pink",
        borderColor: "red",
        textColor: "black",
    }));

    return (
        <div className="calendar-container">
            <h2>📅 ปฏิทินการจอง</h2>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                locale="th"
                dateClick={handleDateClick} // ✅ เมื่อคลิกวันที่
            />

            {/* ✅ แสดงข้อมูลเมื่อเลือกวัน */}
            {selectedDate && (
                <div className="booking-details">
                    <h3>รายละเอียดการจองของวันที่ {selectedDate}</h3>
                    {selectedBookings.length > 0 ? (
                        <ul>
                            {selectedBookings.map((booking) => (
                                <li key={booking.id}>
                                    <p>⏰ เวลา: {booking.booking_time}</p>
                                    <p>👤 ผู้จอง: {booking.user?.username || "ไม่ทราบชื่อ"}</p>
                                    <p>💇 ทรงผม: {booking.hair_style}</p>
                                    <button onClick={() => handleCancelBooking(booking.id)}>❌ ยกเลิกการจอง</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>ไม่มีการจองในวันนี้</p>
                    )}

                    {/* ✅ ช่องกรอกเหตุผล */}
                    <div>
                        <h4>เหตุผลในการยกเลิก:</h4>
                        <input 
                            type="text" 
                            value={cancelReason} 
                            onChange={(e) => setCancelReason(e.target.value)} 
                            placeholder="กรอกเหตุผล..."
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingScheduleCalendar;
