import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./AdminBookingScheduleCalendar.css";

const AdminBookingScheduleCalendar = () => {
    const [eventDays, setEventDays] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch("http://127.0.0.1:8000/api/bookings/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch bookings.");
            }

            const data = await response.json();

            if (data.length === 0) {
                console.warn("⚠ ไม่มีข้อมูลการจอง");
                return;
            }

            const bookedDates = [
                ...new Set(data.map((booking) => new Date(booking.booking_date).toISOString().split("T")[0]))
            ];

            console.log("📅 วันมีคิว:", bookedDates);
            setEventDays(bookedDates);
        } catch (error) {
            console.error("❌ Error fetching bookings:", error);
        }
    };

    const handleDateClick = (arg) => {
        const date = arg.dateStr;
        navigate(`/admin/calendar/booking-details?date=${date}`);
    };

    const events = eventDays.map((date) => ({
        title: "📌 มีการจอง",
        start: date,
        allDay: true,
        backgroundColor: "red",
        borderColor: "darkred",
        textColor: "white",
    }));

    return (
        <div className="calendar-container">
            <h2>📅 ปฏิทินการจอง</h2>
            <button className="back-button" onClick={() => navigate("/admin")}>⬅️ ย้อนกลับ</button> {/* ✅ ปุ่มย้อนกลับ */}
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                locale="th"
                dateClick={handleDateClick}
                height="100%"
                contentHeight="auto"
                expandRows={true}
            />
        </div>
    );
};

export default AdminBookingScheduleCalendar;
