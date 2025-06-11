import React from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Header from "./Header"; // นำเข้า Header
import "./BookingPage.css"; // เพิ่มไฟล์ CSS

const BookingPage = () => {
  const navigate = useNavigate();

  // ✅ เมื่อเลือกวัน → ไปที่หน้า `/available-times?date=YYYY-MM-DD`
  const handleDateClick = (info) => {
    navigate(`/available-times?date=${info.dateStr}`);
  };

  return (
    <div className="booking-page7">
      <Header />
      <div className="calendar-container7">
        <h1 className="title7">📅 ตรวจสอบคิวที่ว่าง</h1>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick} // ⬅️ เมื่อกดวัน ให้เปลี่ยนหน้า
          height="auto" // ทำให้ปฏิทินปรับขนาดตามพื้นที่
        />
      </div>
    </div>
  );
};

export default BookingPage;
