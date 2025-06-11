import React, { useState, useEffect } from "react";
import "./AdminMemberManagementPage.css";

const AdminMemberManagementPage = () => {
    const [members, setMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMember, setSelectedMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            setLoading(true);
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch("http://127.0.0.1:8000/api/admin/members/", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) throw new Error("ไม่สามารถดึงข้อมูลสมาชิกได้");

            const data = await response.json();
            setMembers(data);
            fetchNoShowCount(data);
        } catch (error) {
            setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        } finally {
            setLoading(false);
        }
    };

    const fetchNoShowCount = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch("http://127.0.0.1:8000/api/admin/no-show-count/", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
    
            if (!response.ok) throw new Error("ไม่สามารถโหลดข้อมูล No-Show ได้");
    
            const data = await response.json(); // ข้อมูลที่ได้จะเป็น { "1": 2, "2": 5, ... }
    
            console.log("ข้อมูล No-Show ที่ได้รับ:", data); // แสดงข้อมูลที่ได้มา
    
            setMembers((prevMembers) =>
                prevMembers.map((member) => ({
                    ...member,
                    no_show_count: data[member.id] || 0, // ถ้าไม่มีค่าให้เป็น 0
                }))
            );
        } catch (error) {
            console.error("❌ Error fetching no-show count:", error);
        }
    };
    
    

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleMarkNoShow = async (userId) => {
        const reason = prompt("กรุณากรอกเหตุผลที่ผู้ใช้ไม่มาตามคิว:");
        if (!reason) return;

        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch(`http://127.0.0.1:8000/api/admin/no-show/${userId}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ reason }),
            });

            if (!response.ok) throw new Error("บันทึกไม่สำเร็จ");

            alert("✅ บันทึก No-Show สำเร็จ!");
            fetchMembers();
        } catch (error) {
            alert("❌ เกิดข้อผิดพลาด: " + error.message);
        }
    };

    const handleViewNoShowHistory = (userId) => {
        window.open(`/admin/no-show-history/${userId}`, "_blank");
    };

    const handleSelectMember = (member) => {
        setSelectedMember(member);
    };

    if (loading) return <p>⏳ กำลังโหลดข้อมูล...</p>;
    if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

    const filteredMembers = members.filter((member) =>
        member.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="admin-members-page">
            <h2>👤 จัดการสมาชิก</h2>

            <input
                type="text"
                placeholder="🔍 ค้นหาสมาชิก..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-box"
            />

            <table className="members-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ชื่อผู้ใช้</th>
                        <th>อีเมล</th>
                        <th>เบอร์โทร</th>
                        <th>No-Show (ครั้ง)</th>
                        <th>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMembers.length > 0 ? (
                        filteredMembers.map((member, index) => (
                            <tr key={member.id}>
                                <td>{index + 1}</td>
                                <td
                                    className="clickable-username"
                                    onClick={() => handleSelectMember(member)}
                                    style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                                >
                                    {member.username}
                                </td>
                                <td>{member.email}</td>
                                <td>{member.phone_number || "-"}</td>
                                <td style={{ color: member.no_show_count > 0 ? "red" : "black" }}>
                                    {member.no_show_count || 0}
                                </td>
                                <td>
                                    <button className="no-show-btn" onClick={() => handleMarkNoShow(member.id)}>
                                        ❌ บันทึก No-Show
                                    </button>
                                    {member.no_show_count > 0 && (
                                        <button
                                            className="history-btn"
                                            onClick={() => handleViewNoShowHistory(member.id)}
                                        >
                                            📜 ดูประวัติ
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>❌ ไม่พบสมาชิก</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {selectedMember && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>📄 รายละเอียดสมาชิก</h3>
                        <p><strong>ชื่อผู้ใช้:</strong> {selectedMember.username}</p>
                        <p><strong>ชื่อจริง:</strong> {selectedMember.first_name || "-"}</p>
                        <p><strong>นามสกุล:</strong> {selectedMember.last_name || "-"}</p>
                        <p><strong>อีเมล:</strong> {selectedMember.email}</p>
                        <p><strong>เบอร์โทร:</strong> {selectedMember.phone_number || "-"}</p>
                        <button className="close-btn" onClick={() => setSelectedMember(null)}>❌ ปิด</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminMemberManagementPage;