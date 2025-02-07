// BookingCalendar.js
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './BookingCalendar.css';

const BookingCalendar = () => {
    const [events, setEvents] = useState([]);

    const handleDateClick = (info) => {
        // ตัวอย่างการเพิ่มการจองเมื่อคลิกวันที่ในปฏิทิน
        const newEvent = {
            title: 'การจองใหม่',
            start: info.dateStr,
            allDay: true,
        };
        setEvents([...events, newEvent]);
    };

    return (
        <div className="calendar-container">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth" // แสดงมุมมองแบบเดือนเริ่มต้น
                events={events}
                dateClick={handleDateClick}
                selectable={true}
                headerToolbar={{
                    left: 'prev,next today', // แสดงเฉพาะปุ่มเลื่อนเดือนก่อนหน้า/ถัดไป
                    center: 'title', // แสดงชื่อเดือน
                    right: '' // ซ่อนตัวเลือกมุมมองอื่น ๆ
                }}
            />
        </div>
    );
};

export default BookingCalendar;
