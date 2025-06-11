import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Header1 from "./Header1"; // ✅ นำเข้า Header1
import "./MemberBookingPage.css"; // ✅ นำเข้าไฟล์ CSS

const MemberBookingPage = () => {
    const navigate = useNavigate();
    const [bookedDates, setBookedDates] = useState([]); // ✅ เก็บวันที่จองแล้วของผู้ใช้

    useEffect(() => {
        fetchUserBookings(); // ✅ ดึงข้อมูลคิวของผู้ใช้
    }, []);

    // ✅ ดึงวันที่ที่ผู้ใช้จองแล้ว
    const fetchUserBookings = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch("http://127.0.0.1:8000/api/member-bookings/", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (!response.ok) throw new Error("ไม่สามารถโหลดข้อมูลการจองได้");

            const data = await response.json();

            // ✅ กรองเฉพาะสถานะ "จองสำเร็จ"
            const bookedEvents = data
                .filter((booking) => booking.status === "จองสำเร็จ")
                .map((booking) => ({
                    title: "✅ คิวของฉัน",
                    start: booking.booking_date,
                    color: "#28a745", // ✅ สีเขียวแสดงให้เห็นว่าเป็นคิวที่จองสำเร็จ
                }));

            setBookedDates(bookedEvents);
        } catch (error) {
            console.error("❌ โหลดข้อมูลการจองล้มเหลว:", error);
        }
    };

    // ✅ เมื่อกดเลือกวันที่
    const handleDateClick = (info) => {
        const today = new Date().toISOString().split("T")[0];
        const selected = info.dateStr;

        if (selected < today) {
            return; // ✅ ไม่ให้กดวันที่ก่อนหน้า
        }

        localStorage.setItem("booking_date", selected);
        navigate(`/select-time?date=${selected}`); // ✅ ส่งวันที่ไปหน้าเลือกเวลา
    };

    return (
        <div className="member-booking-page8">
            <Header1 /> {/* ✅ เพิ่ม Header1 */}
            <div className="calendar-container8">
                <h1>📅 เลือกวันที่จองคิว</h1>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    dateClick={handleDateClick}
                    events={bookedDates}
                    height="auto"
                />
            </div>
        </div>
    );
};

export default MemberBookingPage;
