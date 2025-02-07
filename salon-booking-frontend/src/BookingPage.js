import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // Import FullCalendar
import dayGridPlugin from "@fullcalendar/daygrid"; // สำหรับการแสดงปฏิทินรายวัน
import timeGridPlugin from "@fullcalendar/timegrid"; // สำหรับแสดงเวลารายชั่วโมง
import interactionPlugin from "@fullcalendar/interaction"; // สำหรับการคลิกและลาก

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    hairStyle: "",
    price: 120,
    promotion: "",
  });

  const handleDateClick = (info) => {
    // เมื่อผู้ใช้เลือกวันที่
    setSelectedDate(info.dateStr);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleBookingSubmit = () => {
    if (!selectedDate || !selectedTime || !bookingDetails.hairStyle) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
      return;
    }

    // ส่งข้อมูลไปยัง backend
    const bookingData = {
      date: selectedDate,
      time: selectedTime,
      ...bookingDetails,
    };

    console.log("Booking Data:", bookingData);
    alert("จองคิวสำเร็จ!");
  };

  return (
    <div>
      <h1>จองคิวออนไลน์</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth" // แสดงปฏิทินรายเดือน
        dateClick={handleDateClick} // เมื่อคลิกวันที่
      />
      {selectedDate && (
        <div>
          <h2>วันที่ที่เลือก: {selectedDate}</h2>
          <h3>เลือกช่วงเวลา:</h3>
          <div>
            {["10:00", "11:00", "13:00", "14:00"].map((time) => (
              <button
                key={time}
                onClick={() => handleTimeClick(time)}
                style={{
                  padding: "10px",
                  margin: "5px",
                  backgroundColor:
                    selectedTime === time ? "#4caf50" : "#f0f0f0",
                  color: selectedTime === time ? "white" : "black",
                }}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
      {selectedTime && (
        <div>
          <h3>เลือกทรงผม:</h3>
          <select
            value={bookingDetails.hairStyle}
            onChange={(e) =>
              setBookingDetails({
                ...bookingDetails,
                hairStyle: e.target.value,
              })
            }
          >
            <option value="">-- เลือกทรงผม --</option>
            <option value="ทรงผมชายสั้น">ทรงผมชายสั้น</option>
            <option value="ทรงผมหญิงสั้น">ทรงผมหญิงสั้น</option>
            <option value="ทรงผมหญิงยาว">ทรงผมหญิงยาว</option>
          </select>
          <h3>ใส่โปรโมชั่น (ถ้ามี):</h3>
          <input
            type="text"
            placeholder="กรอกรหัสโปรโมชั่น"
            value={bookingDetails.promotion}
            onChange={(e) =>
              setBookingDetails({
                ...bookingDetails,
                promotion: e.target.value,
              })
            }
          />
          <div>
            <button onClick={handleBookingSubmit}>ยืนยันการจอง</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
