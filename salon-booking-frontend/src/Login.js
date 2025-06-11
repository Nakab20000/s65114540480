import React, { useState } from 'react';
import authService from './authService';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);  // ✅ เพิ่ม state สำหรับโหลดข้อมูล
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ ตรวจสอบข้อมูลที่กรอก
        if (!username || !password) {
            alert("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน!");
            return;
        }

        setLoading(true); // ✅ แสดงว่าอยู่ระหว่างโหลด

        try {
            const response = await authService.login(username, password);

            if (response.status === 200 && response.data.access && response.data.refresh) {
                // ✅ เก็บข้อมูลลง localStorage
                localStorage.setItem("accessToken", response.data.access);
                localStorage.setItem("refreshToken", response.data.refresh);
                localStorage.setItem("username", username);
                localStorage.setItem("user_id", response.data.user_id); // ✅ เพิ่ม user_id
                localStorage.setItem("role", response.data.role);

                // ✅ ตรวจสอบ role จาก response
                if (response.data.role === 'admin') {
                    navigate('/admin'); // ✅ นำทางไปหน้า admin
                } else {
                    navigate('/main'); // ✅ นำทางไปหน้า main (สมาชิก)
                }
            } else {
                alert("เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบข้อมูลอีกครั้ง!");
            }
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            alert(error.response?.data?.detail || "เข้าสู่ระบบล้มเหลว! กรุณาลองอีกครั้ง.");
        } finally {
            setLoading(false); // ✅ ปิดโหลดข้อมูล
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    const handleResetPassword = () => {
        navigate('/request-reset');
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>เข้าสู่ระบบ</h2>
                <div className="form-group">
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="ชื่อผู้ใช้งาน"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="รหัสผ่าน"
                        required
                    />
                </div>
                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                </button>
                <div className="login-links">
                    <button type="button" onClick={handleResetPassword} className="link-button">ลืมรหัสผ่าน</button>
                    <button type="button" onClick={handleRegister} className="link-button">สมัครสมาชิก</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
