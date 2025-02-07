import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
    const [formData, setFormData] = useState({ old_password: '', new_password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/reset-password/', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Reset password failed');
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input name="old_password" placeholder="Old Password" onChange={handleChange} />
                <input name="new_password" placeholder="New Password" onChange={handleChange} />
                <button type="submit">Reset Password</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default ResetPassword;
