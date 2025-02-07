import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const Memberbookingpage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    localStorage.setItem("booking_date", info.dateStr);
    navigate(`/select-time?date=${info.dateStr}`); // ส่งวันที่ไปหน้าเลือกเวลา
  };
  return (
    <div>
      <h1>เลือกวันที่จองคิว</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
      />
    </div>
  );
};

export default Memberbookingpage;
