import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/'; 

const PortfolioEdit = () => {
    const { id } = useParams(); // ดึง id จาก URL
    const navigate = useNavigate(); // ใช้สำหรับนำทางหลังจากอัปเดตข้อมูล
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image1: null,
        image2: null,
        image3: null,
        image4: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ดึงข้อมูล portfolio เดิมจาก API
    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await axios.get(`${API_URL}portfolio/${id}/`);
                const { title, description, image1, image2, image3, image4 } = response.data;
                setFormData({ title, description, image1, image2, image3, image4 });
                setLoading(false);
            } catch (err) {
                console.error('Error fetching portfolio:', err);
                setError('Failed to load portfolio.');
                setLoading(false);
            }
        };
        fetchPortfolio();
    }, [id]);

    // ฟังก์ชันจัดการการเปลี่ยนแปลงในฟอร์ม
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // ฟังก์ชันจัดการการเปลี่ยนรูปภาพ
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: files[0], // ใช้ไฟล์แรกจากตัวเลือก
        }));
    };

    // ฟังก์ชันส่งข้อมูลอัปเดต
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = new FormData();
        updatedFormData.append('title', formData.title);
        updatedFormData.append('description', formData.description);
        if (formData.image1 instanceof File) updatedFormData.append('image1', formData.image1);
        if (formData.image2 instanceof File) updatedFormData.append('image2', formData.image2);
        if (formData.image3 instanceof File) updatedFormData.append('image3', formData.image3);
        if (formData.image4 instanceof File) updatedFormData.append('image4', formData.image4);

        try {
            await axios.put(`${API_URL}portfolio/${id}/`, updatedFormData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            navigate('/admin/portfolio'); // เปลี่ยนเส้นทางหลังอัปเดตสำเร็จ
        } catch (err) {
            console.error('Error updating portfolio:', err);
            setError('Failed to update portfolio.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Edit Portfolio</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Image 1</label>
                    <input
                        type="file"
                        name="image1"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                </div>
                <div>
                    <label>Image 2</label>
                    <input
                        type="file"
                        name="image2"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                </div>
                <div>
                    <label>Image 3</label>
                    <input
                        type="file"
                        name="image3"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                </div>
                <div>
                    <label>Image 4</label>
                    <input
                        type="file"
                        name="image4"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default PortfolioEdit;
