import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NoShowMembersPage.css"; // ✅ ใช้ CSS สำหรับจัดรูปแบบ

const NoShowMembersPage = () => {
    const navigate = useNavigate();
    const [noShowMembers, setNoShowMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNoShowMembers();
    }, []);

    const fetchNoShowMembers = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch("http://127.0.0.1:8000/api/admin/no-show-members/", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) throw new Error("ไม่สามารถโหลดข้อมูลสมาชิกที่ไม่มาตามคิว");

            const data = await response.json();
            setNoShowMembers(data);
        } catch (error) {
            setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>⏳ กำลังโหลดข้อมูล...</p>;
    if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

    return (
        <div className="noshow-members-page">
            <h2>❌ สมาชิกที่ไม่มาตามคิว</h2>
            {noShowMembers.length === 0 ? (
                <p>✅ ยังไม่มีสมาชิกที่ถูกบันทึกว่า No-Show</p>
            ) : (
                <table className="noshow-table">
                    <thead>
                        <tr>
                            <th>ชื่อผู้ใช้</th>
                            <th>เหตุผลที่ไม่มาตามคิว</th>
                            <th>วันที่บันทึก</th>
                        </tr>
                    </thead>
                    <tbody>
                        {noShowMembers.map((record) => (
                            <tr key={record.id}>
                                <td>{record.username}</td>
                                <td>{record.reason}</td>
                                <td>{new Date(record.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <button className="back-btn" onClick={() => navigate("/admin")}>
                🔙 ย้อนกลับ
            </button>
        </div>
    );
};

export default NoShowMembersPage;
