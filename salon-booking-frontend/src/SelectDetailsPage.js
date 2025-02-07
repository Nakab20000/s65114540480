import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SelectDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const selectedDate = queryParams.get("date");
  const selectedTime = queryParams.get("time");

  const [bookingDetails, setBookingDetails] = useState({
    hairStyle: "",
    hairType: "",
    promotion: "",
    stylistId: "", // ✅ เพิ่มฟิลด์ช่าง
    price: 200, // ✅ ตั้งค่าราคาคงที่
  });

  // ✅ ตรวจสอบว่า selectedDate และ selectedTime ถูกต้องหรือไม่
  if (!selectedDate || !selectedTime) {
    alert("วันที่หรือเวลาไม่ถูกต้อง");
    return null;
  }

  const handleBookingSubmit = async () => {
    if (!bookingDetails.hairStyle || !bookingDetails.hairType) {
      alert("กรุณาเลือกทรงผมและลักษณะเส้นผม!");
      return;
    }

    let finalPrice = bookingDetails.price;
    if (bookingDetails.promotion) {
      finalPrice = bookingDetails.price * 0.9;
    }

    // ✅ ดึง user_id และ accessToken จาก localStorage
    const user_id = localStorage.getItem("user_id");
    const accessToken = localStorage.getItem("accessToken");

    if (!user_id || !accessToken) {
      alert("Session หมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง!");
      navigate("/login");
      return;
    }

    // ✅ ตรวจสอบว่า selectedDate และ selectedTime อยู่ในรูปแบบที่ถูกต้อง
    const formattedDate = new Date(selectedDate).toISOString().split("T")[0]; // เปลี่ยนเป็น YYYY-MM-DD

    const bookingData = {
      user_id: user_id, // ✅ ต้องใช้ `user_id` ไม่ใช่ `user`
      booking_date: formattedDate, // ✅ Django ใช้ `booking_date`
      booking_time: selectedTime, // ✅ Django ใช้ `booking_time`
      hair_style: bookingDetails.hairStyle,
      hair_type: bookingDetails.hairType,
      promotion: bookingDetails.promotion,
      stylist_id: bookingDetails.stylistId || null, // ✅ ถ้าไม่มี ให้เป็น `null`
      price: finalPrice,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/create-booking/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // ✅ เพิ่ม Token
        },
        body: JSON.stringify(bookingData),
      });

      if (response.status === 400) {
        const errorData = await response.json();
        console.error("Booking Error:", errorData);
        alert("เกิดข้อผิดพลาดในการจองคิว: " + JSON.stringify(errorData));
        return;
      }

      if (response.status === 401) {
        alert("Session หมดอายุ กรุณาเข้าสู่ระบบใหม่!");
        localStorage.removeItem("accessToken");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("เกิดข้อผิดพลาดในการจองคิว");
      }

      alert("จองคิวสำเร็จ!");
      navigate("/main"); // ✅ กลับไปหน้าเมนูหลัก
    } catch (error) {
      console.error("Error:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อ API!");
    }
  };

  return (
    <div>
      <h1>เลือกทรงผม & โปรโมชั่น</h1>
      <h2>วันที่: {selectedDate}</h2>
      <h2>เวลา: {selectedTime}</h2>

      <h3>เลือกทรงผม:</h3>
      <select
        value={bookingDetails.hairStyle}
        onChange={(e) => setBookingDetails({ ...bookingDetails, hairStyle: e.target.value })}
      >
        <option value="">-- เลือกทรงผม --</option>
        <option value="ทรงผมชายสั้น">ทรงผมชายสั้น</option>
        <option value="ทรงผมหญิงสั้น">ทรงผมหญิงสั้น</option>
        <option value="ทรงผมหญิงยาว">ทรงผมหญิงยาว</option>
      </select>

      <h3>เลือกลักษณะเส้นผม:</h3>
      <select
        value={bookingDetails.hairType}
        onChange={(e) => setBookingDetails({ ...bookingDetails, hairType: e.target.value })}
      >
        <option value="">-- เลือกลักษณะเส้นผม --</option>
        <option value="เส้นผมตรง">เส้นผมตรง</option>
        <option value="เส้นผมหยักศก">เส้นผมหยักศก</option>
        <option value="เส้นผมหยิก">เส้นผมหยิก</option>
      </select>

      <h3>เลือกช่าง (ถ้ามี):</h3>
      <input
        type="text"
        placeholder="รหัสช่าง (ถ้ามี)"
        value={bookingDetails.stylistId}
        onChange={(e) => setBookingDetails({ ...bookingDetails, stylistId: e.target.value })}
      />

      <h3>ใส่โปรโมชั่น (ถ้ามี):</h3>
      <input
        type="text"
        placeholder="กรอกรหัสโปรโมชั่น"
        value={bookingDetails.promotion}
        onChange={(e) => setBookingDetails({ ...bookingDetails, promotion: e.target.value })}
      />

      <h3>ราคา: {bookingDetails.promotion ? bookingDetails.price * 0.9 : bookingDetails.price} บาท</h3>

      <button onClick={handleBookingSubmit}>ยืนยันการจอง</button>
    </div>
  );
};

export default SelectDetailsPage;
