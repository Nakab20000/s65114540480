import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AdminHairstyleDetail.css";  // สไตล์สำหรับหน้ารายละเอียด

const AdminHairstyleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hairstyle, setHairstyle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ name: "", description: "", price: "", image: null });

    // ดึงข้อมูลทรงผมจาก API
    useEffect(() => {
        const fetchHairstyle = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/hairstyles/${id}/`);
                if (!response.ok) throw new Error("ไม่สามารถโหลดข้อมูลทรงผมได้");

                const data = await response.json();
                setHairstyle(data);
                setFormData({ name: data.name, description: data.description, price: data.price, image: null });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHairstyle();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("คุณต้องการลบทรงผมนี้หรือไม่?")) return;

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/hairstyles/${id}/`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("ลบไม่สำเร็จ");
            alert("ลบทรงผมสำเร็จ!");
            navigate("/admin/hairstyles");
        } catch (error) {
            alert("เกิดข้อผิดพลาด: " + error.message);
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();

        const formDataToSubmit = new FormData();
        formDataToSubmit.append("name", formData.name);
        formDataToSubmit.append("description", formData.description);
        formDataToSubmit.append("price", formData.price);
        if (formData.image) {
            formDataToSubmit.append("image", formData.image);
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/hairstyles/${id}/`, {
                method: "PUT",
                body: formDataToSubmit,
            });

            if (!response.ok) throw new Error("แก้ไขไม่สำเร็จ");
            alert("บันทึกสำเร็จ!");
            setEditMode(false);
            // รีเฟรชข้อมูลหลังการแก้ไข
            const updatedHairstyle = await response.json();
            setHairstyle(updatedHairstyle);
        } catch (error) {
            alert("เกิดข้อผิดพลาด: " + error.message);
        }
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    if (loading) return <p>⏳ กำลังโหลดข้อมูล...</p>;
    if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

    return (
        <div className="admin-hairstyle-detail-container">
            <button className="back-button" onClick={() => navigate(-1)}>🔙 กลับ</button>
            <div className="details-card">
                <img
                    src={hairstyle.image ? hairstyle.image : "/images/default-haircut.jpg"}
                    alt={hairstyle.name}
                    className="hairstyle-image"
                />
                {editMode ? (
                    <form onSubmit={handleEdit}>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            required
                        />
                        <div>
                            <label>อัปโหลดรูปภาพ</label>
                            <input type="file" onChange={handleImageChange} />
                        </div>
                        <button type="submit">💾 บันทึก</button>
                        <button type="button" onClick={() => setEditMode(false)}>❌ ยกเลิก</button>
                    </form>
                ) : (
                    <>
                        <h2>{hairstyle.name}</h2>
                        <p>{hairstyle.description}</p>
                        <p>💰 ราคา: {hairstyle.price} บาท</p>
                        <button onClick={() => setEditMode(true)}>✏️ แก้ไข</button>
                        <button onClick={handleDelete} className="delete-button">🗑️ ลบ</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminHairstyleDetail;
