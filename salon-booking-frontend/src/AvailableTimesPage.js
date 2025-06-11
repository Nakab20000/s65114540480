import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const AvailableTimesPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedDate = queryParams.get("date"); // ✅ รับค่าวันที่จาก URL

  const [bookedTimes, setBookedTimes] = useState([]); // ✅ เก็บเวลาที่ถูกจองของวันนั้น
  const [timeSlots, setTimeSlots] = useState([]);

  // ✅ สร้างช่วงเวลา (09:00 - 19:00) และข้าม 12:00 - 13:00
  const generateTimeSlots = () => {
    const times = [];
    let current = new Date(`2023-01-01T09:00:00`);
    const endTime = new Date(`2023-01-01T19:00:00`);

    while (current < endTime) {
      const startTime = current.toTimeString().slice(0, 5);
      current.setMinutes(current.getMinutes() + 30);
      const endTime = current.toTimeString().slice(0, 5);

      // ❌ ข้ามเวลาพัก 12:00 - 13:00
      if (startTime !== "12:00" && startTime !== "12:30") {
        times.push(`${startTime}-${endTime}`);
      }
    }
    return times;
  };

  useEffect(() => {
    if (!selectedDate) return;

    // ✅ ดึงข้อมูลเวลาที่ถูกจองจาก API ตามวันที่ที่เลือก
    const fetchBookedTimes = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/bookings/?date=${selectedDate}`);
        if (response.ok) {
          const data = await response.json();
          const booked = data.map((booking) => booking.booking_time.slice(0, 5)); // ✅ ดึงเวลา HH:MM
          setBookedTimes(booked); // ✅ อัปเดต state bookedTimes
        } else {
          console.error("⚠️ API ไม่สามารถดึงข้อมูลการจองได้");
          setBookedTimes([]);
        }
      } catch (error) {
        console.error("🚨 Error fetching booked times:", error);
        setBookedTimes([]);
      }
    };

    fetchBookedTimes();
    setTimeSlots(generateTimeSlots()); // ✅ อัปเดต timeSlots ทุกครั้งที่เลือกวัน
  }, [selectedDate]);

  // ✅ ตรวจสอบว่าวันไหนมีการจอง และกำหนดสีให้ปุ่ม
  const getButtonStyle = (time) => {
    const startTime = time.split("-")[0];

    if (bookedTimes.includes(startTime)) {
      return { backgroundColor: "red", color: "white", cursor: "not-allowed" }; // ❌ เวลาถูกจอง (สีแดง)
    } else {
      return { backgroundColor: "#2196F3", color: "white", cursor: "default" }; // ✅ เวลาว่าง (สีฟ้า)
    }
  };

  return (
    <div>
      <h1>🕒 คิวว่างสำหรับวันที่: {selectedDate}</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {timeSlots.map((time) => (
          <button
            key={time}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              ...getButtonStyle(time),
            }}
            disabled
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AvailableTimesPage;
