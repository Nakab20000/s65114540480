import React, { useState } from 'react';
import authService from './authService';  // ใช้ authService สำหรับการ login
import { useNavigate } from 'react-router-dom';
import './CreatePortfolio.css';

const CreatePortfolio = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState({
        image1: null,
        image2: null,
        image3: null,
        image4: null
    });
    const navigate = useNavigate();

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
                alert('Portfolio created successfully!');
                navigate('/admin');  // พากลับไปที่หน้า admin
            })
            .catch(error => {
                console.error("There was an error!", error);
                alert('Failed to create portfolio.');
            });
    };

    return (
        <div className="create-portfolio-container">
            <h2>Create Portfolio</h2>
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
                    <input type="file" onChange={(e) => handleImageChange(e, 'image1')} />
                    <input type="file" onChange={(e) => handleImageChange(e, 'image2')} />
                    <input type="file" onChange={(e) => handleImageChange(e, 'image3')} />
                    <input type="file" onChange={(e) => handleImageChange(e, 'image4')} />
                </div>
                <button type="submit">Submit Portfolio</button>
            </form>
        </div>
    );
};

export default CreatePortfolio;
