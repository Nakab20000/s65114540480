import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // ส่งคำขอ logout ไปยัง API
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                await axios.post('http://localhost:8000/api/logout/', { refresh: refreshToken });
            }

            // ลบข้อมูลการเข้าสู่ระบบจาก localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');

            // แสดงข้อความสำเร็จ
            alert('Logged out successfully');

            // นำทางไปหน้า Login หลังจาก logout
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            alert('Logout failed, please try again later.');
        }
    };

    return (
        <div>
            <h2>Logout</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
