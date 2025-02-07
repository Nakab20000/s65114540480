import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SelectTimePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const selectedDate = queryParams.get("date");

  const [selectedTime, setSelectedTime] = useState(null);

  const handleNext = () => {
    if (!selectedTime) {
      alert("กรุณาเลือกช่วงเวลา!");
      return;
    }

    localStorage.setItem("booking_time", selectedTime); // ⬅️ บันทึกเวลา
    navigate(`/select-details?date=${selectedDate}&time=${selectedTime}`);
  };

  return (
    <div>
      <h1>เลือกเวลา</h1>
      <h2>วันที่ที่เลือก: {selectedDate}</h2>
      <h3>เลือกช่วงเวลา:</h3>
      <div>
        {["10:00", "11:00", "13:00", "14:00"].map((time) => (
          <button
            key={time}
            onClick={() => setSelectedTime(time)}
            style={{
              padding: "10px",
              margin: "5px",
              backgroundColor: selectedTime === time ? "#4caf50" : "#f0f0f0",
              color: selectedTime === time ? "white" : "black",
            }}
          >
            {time}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={!selectedTime}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: selectedTime ? "#4CAF50" : "#ccc",
          color: "white",
          border: "none",
          cursor: selectedTime ? "pointer" : "not-allowed",
        }}
      >
        ถัดไป
      </button>
    </div>
  );
};

export default SelectTimePage;
