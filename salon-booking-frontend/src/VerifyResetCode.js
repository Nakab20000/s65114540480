import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyResetCode = () => {
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = new URLSearchParams(location.search).get('email');  // ดึง email จาก URL
    console.log("Email from URL:", email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/verify-reset-token/', { token });
            if (response.data.is_valid) {
                // ส่งข้อมูล email และ token ไปยังหน้า ResetPassword ผ่าน state
                navigate('/reset-password', { state: { email, token } });
            } else {
                setMessage('Invalid reset token');
            }
        } catch (error) {
            setMessage('Error verifying token');
        }
    };

    return (
        <div>
            <h2>Verify Reset Code</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter reset code"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                />
                <button type="submit">Verify Code</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default VerifyResetCode;
