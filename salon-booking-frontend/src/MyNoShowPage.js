import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyNoShowPage.css";

const MyNoShowPage = () => {
    const navigate = useNavigate();
    const [noShowRecords, setNoShowRecords] = useState([]);

    useEffect(() => {
        fetchNoShowDetails();
    }, []);

    const fetchNoShowDetails = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch("http://127.0.0.1:8000/api/member/no-show-details/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) throw new Error("ไม่สามารถโหลดข้อมูล No-Show ได้");

            const data = await response.json();
            setNoShowRecords(data);
        } catch (error) {
            console.error("❌ Error fetching no-show details:", error);
        }
    };

    return (
        <div className="no-show-page">
            <h2>❌ รายละเอียดการไม่มาตามคิว</h2>

            {noShowRecords.length === 0 ? (
                <p>✅ คุณยังไม่มีการไม่มาตามคิว</p>
            ) : (
                <table className="no-show-table">
                    <thead>
                        <tr>
                            <th>วันที่</th>
                            <th>เหตุผล</th>
                        </tr>
                    </thead>
                    <tbody>
                        {noShowRecords.map((record, index) => (
                            <tr key={index}>
                                <td>{new Date(record.created_at).toLocaleDateString()}</td>
                                <td>{record.reason}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <button className="back-btn" onClick={() => navigate("/main/profile")}>
                🔙 ย้อนกลับ
            </button>
        </div>
    );
};

export default MyNoShowPage;
