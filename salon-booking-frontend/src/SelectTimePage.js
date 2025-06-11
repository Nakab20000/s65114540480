import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SelectTimePage.css";

const SelectTimePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const selectedDate = queryParams.get("date");

  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedTimesByDate, setBookedTimesByDate] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const generateTimeSlots = (startDate, endDate, startTime, endTime) => {
    const timeSlots = {};
    const now = new Date();

    let currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
      const dateKey = currentDate.toISOString().split("T")[0]; 
      timeSlots[dateKey] = [];

      let current = new Date(`${dateKey}T${startTime}:00`);
      const endTimeOfDay = new Date(`${dateKey}T${endTime}:00`);

      while (current < endTimeOfDay) {
        const startTimeFormatted = current.toTimeString().slice(0, 5);
        current.setMinutes(current.getMinutes() + 30);
        const endTimeFormatted = current.toTimeString().slice(0, 5);

        if (current < now) {
          timeSlots[dateKey].push(`${startTimeFormatted}-${endTimeFormatted}-closed`);
        } else if (startTimeFormatted === "12:00" || startTimeFormatted === "12:30") {
          timeSlots[dateKey].push(`${startTimeFormatted}-${endTimeFormatted}-closed`);
        } else {
          timeSlots[dateKey].push(`${startTimeFormatted}-${endTimeFormatted}`);
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return timeSlots;
  };

  useEffect(() => {
    const fetchBookedTimes = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(
          `http://127.0.0.1:8000/api/bookings/?date=${selectedDate}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const bookedTimesFromAPI = data.map((booking) =>
            booking.booking_time.slice(0, 5)
          );
          setBookedTimesByDate((prev) => ({
            ...prev,
            [selectedDate]: bookedTimesFromAPI,
          }));
        } else {
          setBookedTimesByDate((prev) => ({
            ...prev,
            [selectedDate]: [],
          }));
        }
      } catch (error) {
        setBookedTimesByDate((prev) => ({
          ...prev,
          [selectedDate]: [],
        }));
      }
    };

    fetchBookedTimes();

    // ✅ แก้ไขให้ `generateTimeSlots()` ใช้ `selectedDate` และตั้งค่า `setTimeSlots`
    const slots = generateTimeSlots(selectedDate, selectedDate, "09:00", "19:00");
    setTimeSlots(slots[selectedDate] || []); 

  }, [selectedDate]);

  const handleNext = () => {
    if (!selectedTime) {
      alert("กรุณาเลือกช่วงเวลา!");
      return;
    }

    localStorage.setItem("booking_time", selectedTime);
    navigate(`/select-details?date=${selectedDate}&time=${selectedTime}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const getButtonClass = (time) => {
    const [startTime, , isClosed] = time.split("-");
    const bookedTimes = bookedTimesByDate[selectedDate] || [];

    if (isClosed) return "time-button10 closed10";
    if (bookedTimes.includes(startTime)) return "time-button10 booked10";
    if (
      selectedDate === new Date().toISOString().split("T")[0] &&
      startTime < currentTime
    )
      return "time-button10 past10";
    return selectedTime === time ? "time-button10 selected10" : "time-button10";
  };

  return (
    <div className="select-time-container10">
      <h1 className="select-time-title10">เลือกเวลา</h1>
      <h2 className="select-time-subtitle10">วันที่ที่เลือก: {selectedDate}</h2>
      <h3 className="select-time-subtitle10">เลือกช่วงเวลา:</h3>
      <div className="time-grid10">
        {timeSlots.map((time) => (
          <button
            key={time}
            onClick={() => setSelectedTime(time)}
            className={getButtonClass(time)}
            disabled={
              time.includes("-closed") ||
              bookedTimesByDate[selectedDate]?.includes(time.split("-")[0]) ||
              (selectedDate === new Date().toISOString().split("T")[0] &&
                time.split("-")[0] < currentTime)
            }
          >
            {time.replace("-closed", "")}
          </button>
        ))}
      </div>

      <div className="action-buttons10">
        <button className="back-button10" onClick={handleBack}>
          กลับ
        </button>
        <button
          className={`next-button10 ${!selectedTime ? "disabled10" : ""}`}
          onClick={handleNext}
          disabled={!selectedTime}
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
};

export default SelectTimePage;
