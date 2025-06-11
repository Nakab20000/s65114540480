import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePortfolioPage.css';

const CreatePortfolioPage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState({ image1: null, image2: null, image3: null, image4: null });
    const [errorMessage, setErrorMessage] = useState(null);

    const handleImageChange = (e, imageNumber) => {
        setImages({ ...images, [imageNumber]: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);

        if (images.image1) formData.append('image1', images.image1);
        if (images.image2) formData.append('image2', images.image2);
        if (images.image3) formData.append('image3', images.image3);
        if (images.image4) formData.append('image4', images.image4);

        const accessToken = localStorage.getItem('accessToken');

        fetch('http://127.0.0.1:8000/api/portfolio/create/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    console.log('Portfolio created successfully', data);
                    alert('Portfolio created successfully!');
                    navigate('/admin');
                } else {
                    console.log('Error creating portfolio:', data); // Log errors to the console
                    setErrorMessage('Failed to create portfolio. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setErrorMessage('Failed to create portfolio. Please try again.');
            });

    };

    return (
        <div className="create-portfolio-page">
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
    );
};

export default CreatePortfolioPage;
