import React, { useState, useEffect } from "react";
import "./AdminHairstylesPage.css"; // ให้แน่ใจว่ามีไฟล์ CSS
import HeaderAdmin from './HeaderAdmin';

const AdminHairstylesPage = () => {
    const [hairstyles, setHairstyles] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState(""); // ✅ เพิ่มฟิลด์ description
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchHairstyles();
    }, []);

    const fetchHairstyles = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/hairstyles/");
            const data = await response.json();
            setHairstyles(data);
        } catch (error) {
            console.error("❌ Error fetching hairstyles:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description); // ✅ ส่ง description ไปด้วย
        formData.append("price", price);
        if (image) formData.append("image", image);

        try {
            await fetch("http://127.0.0.1:8000/api/hairstyles/create/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: formData,
            });

            alert("✅ เพิ่มทรงผมสำเร็จ!");
            fetchHairstyles();
            setName("");
            setDescription(""); // ✅ เคลียร์ค่า description
            setPrice("");
            setImage(null);
        } catch (error) {
            alert("❌ เกิดข้อผิดพลาดในการเพิ่มทรงผม");
        }
    };

    return (
        <div className="admin-hairstyles">
            <header>
                <HeaderAdmin />
            </header>
            <h2>💇‍♂️ จัดการทรงผม</h2>
            <form onSubmit={handleSubmit} className="hairstyle-form">
                <input 
                    type="text" 
                    placeholder="ชื่อทรงผม" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <textarea
                    placeholder="คำอธิบายทรงผม" // ✅ เพิ่ม input สำหรับ description
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <input 
                    type="number" 
                    placeholder="ราคา" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    required 
                />
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                <button type="submit">✅ เพิ่มทรงผม</button>
            </form>

            <h3>📋 รายการทรงผม</h3>
            <div className="hairstyle-list">
                {hairstyles.length > 0 ? (
                    hairstyles.map((hair) => (
                        <div key={hair.id} className="hairstyle-card1">
                            <img 
                                src={hair.image || "/images/default-haircut.jpg"} 
                                alt={hair.name} 
                                className="hairstyle-img"
                            />
                            <p className="hairstyle-name">{hair.name}</p>
                            <p className="hairstyle-price">💰 {hair.price} บาท</p>
                        </div>
                    ))
                ) : (
                    <p>❌ ยังไม่มีทรงผมในระบบ</p>
                )}
            </div>
        </div>
    );
};

export default AdminHairstylesPage;
