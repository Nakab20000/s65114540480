// Editp.js
import React, { useState, useEffect } from 'react';
import authService from './authService';
import { useNavigate } from 'react-router-dom';
import './Editp.css';
//import Header1 from './Header1';

const Editp = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        phone_number: '',
        first_name: '',
        last_name: '',
    });
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // ดึงข้อมูลผู้ใช้เมื่อโหลดหน้า
        authService.getUserProfile()
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch user data:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword && newPassword !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        const updatedData = { ...userData };
        if (newPassword) {
            updatedData.password = newPassword;
        }

        authService.updateUserProfile(updatedData)
            .then(response => {
                alert('Profile updated successfully.');
                navigate('/profile'); // เปลี่ยนเส้นทางกลับไปที่หน้าโปรไฟล์
            })
            .catch(error => {
                console.error('Failed to update profile:', error);
                alert('Failed to update profile. Please try again.');
            });
    };

    const handleBack = () => {
        navigate('/profile'); // เปลี่ยนเส้นทางกลับไปที่หน้าโปรไฟล์
    };

    return (
        <div className="edit-profile-container">
            
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <h2>แก้ไขโปรไฟล์</h2>
                
               
                <div className="form-group">
                    <label>ชื่อจริง</label>
                    <input
                        type="text"
                        name="first_name"
                        value={userData.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>นามสกุล</label>
                    <input
                        type="text"
                        name="last_name"
                        value={userData.last_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>อีเมล</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>เบอร์โทร</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={userData.phone_number}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>รหัสผ่านใหม่ (ถ้าต้องการเปลี่ยน)</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>ยืนยันรหัสผ่านใหม่</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="save-button">บันทึก</button>
                <button type="button" className="back-button" onClick={handleBack}>ย้อนกลับ</button>
            </form>
        </div>
    );
};

export default Editp;
