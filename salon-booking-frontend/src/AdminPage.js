import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';
import HeaderAdmin from './HeaderAdmin';
import authService from './authService';

const AdminPage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState({ image1: null, image2: null, image3: null, image4: null });
    const [showAddPortfolio, setShowAddPortfolio] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role !== 'admin') {
            navigate('/login');
        }
    }, [navigate]);

    const handleImageChange = (e, imageNumber) => {
        setImages({ ...images, [imageNumber]: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image1', images.image1);
        formData.append('image2', images.image2);
        formData.append('image3', images.image3);
        formData.append('image4', images.image4);

        const accessToken = localStorage.getItem('accessToken');

        authService.createPortfolio(formData, accessToken)
            .then(response => {
                console.log('Portfolio created successfully', response);
                alert('Portfolio created successfully!');
                setShowAddPortfolio(false);
                navigate('/admin');
            })
            .catch(error => {
                console.error('Error:', error.response || error);
                setErrorMessage('Failed to create portfolio. Please try again.');
            });
    };

    return (
        <div className="admin-page">
            <header>
                <HeaderAdmin />
            </header>

            <div className="content" style={{ display: 'flex', width: '100%' }}>
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h2>BaBershop</h2>
                    </div>
                    <div className="sidebar-links">
                        <button className="link-item" onClick={() => setShowAddPortfolio(true)}>เพิ่มผลงาน</button>
                        <a href="/admin/portfolio" className="link-item">รายละเอียดผลงาน</a>
                        <button className="link-item" onClick={() => navigate('/admin/bookings')}>📋 จัดการการจอง</button>
                        <button className="link-item" onClick={() => navigate('/admin/calendar')}>📅 ดูปฏิทินการจอง</button> {/* ✅ ปุ่มไปหน้า BookingScheduleCalendar */}
                    </div>
                </div>

                {showAddPortfolio && (
                    <div className="create-portfolio-container">
                        <h2>Create Portfolio</h2>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Portfolio Title"
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Description"
                                />
                            </div>
                            <div className="form-group">
                                <label>Image 1:</label>
                                <input type="file" onChange={(e) => handleImageChange(e, 'image1')} />
                            </div>
                            <div className="form-group">
                                <label>Image 2:</label>
                                <input type="file" onChange={(e) => handleImageChange(e, 'image2')} />
                            </div>
                            <div className="form-group">
                                <label>Image 3:</label>
                                <input type="file" onChange={(e) => handleImageChange(e, 'image3')} />
                            </div>
                            <div className="form-group">
                                <label>Image 4:</label>
                                <input type="file" onChange={(e) => handleImageChange(e, 'image4')} />
                            </div>
                            <button type="submit">Submit Portfolio</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
