import React, { useState, useEffect } from 'react';
import authService from './authService';
import { useNavigate } from 'react-router-dom';
import './Editp.css';

const Editp = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        phone_number: '',
        first_name: '',
        last_name: '',
        profile_image: null,
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await authService.getUserProfile();
                setUserData({ ...response.data });
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                navigate('/main/profile');
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setUserData({
            ...userData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in userData) {
            if (userData[key]) {
                formData.append(key, userData[key]);
            }
        }

        try {
            await authService.updateUserProfile(formData);
            alert('✅ อัปเดตโปรไฟล์สำเร็จ!');
            navigate('/main/profile');
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('❌ ไม่สามารถอัปเดตโปรไฟล์ได้');
        }
    };

    if (loading) return <p>⏳ กำลังโหลดข้อมูลโปรไฟล์...</p>;

    return (
        <div className="edit-profile-container">
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <h2>แก้ไขโปรไฟล์</h2>

                <div className="form-group">
                    <label>ชื่อผู้ใช้</label>
                    <input type="text" name="username" value={userData.username} disabled />
                </div>
                <div className="form-group">
                    <label>ชื่อจริง</label>
                    <input type="text" name="first_name" value={userData.first_name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>นามสกุล</label>
                    <input type="text" name="last_name" value={userData.last_name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>อีเมล</label>
                    <input type="email" name="email" value={userData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>เบอร์โทร</label>
                    <input type="text" name="phone_number" value={userData.phone_number} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>รูปโปรไฟล์</label>
                    <input type="file" name="profile_image" accept="image/*" onChange={handleChange} />
                </div>

                <button type="submit" className="save-button">บันทึก</button>
            </form>
        </div>
    );
};

export default Editp;
