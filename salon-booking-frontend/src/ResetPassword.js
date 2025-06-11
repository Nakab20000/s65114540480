import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();  // ดึงข้อมูลจาก state ที่ส่งมาจากหน้า VerifyResetCode
    const navigate = useNavigate();
    const { email, token } = location.state || {};  // ตรวจสอบว่า state มีข้อมูลหรือไม่

    // ตรวจสอบว่า email และ token มีค่าหรือไม่
    console.log("Email:", email);
    console.log("Token:", token);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/reset-password-confirm/', {
                email,
                token,
                new_password: newPassword
            });
            setMessage(response.data.message);
            // หลังจากรีเซ็ตรหัสผ่านเสร็จแล้ว ให้นำทางไปยังหน้า login
            navigate('/login');
        } catch (error) {
            setMessage('Error resetting password');
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="password" 
                    placeholder="Enter your new password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Reset Password</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default ResetPassword;
