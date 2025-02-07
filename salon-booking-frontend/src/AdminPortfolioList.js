import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './authService';
import './AdminPortfolioList.css';

const AdminPortfolioList = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                const response = await authService.getPortfolios();
                if (Array.isArray(response.data)) {
                    setPortfolios(response.data);
                } else {
                    setPortfolios([]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching portfolios:', error);
                setLoading(false);
            }
        };

        fetchPortfolios();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="admin-portfolio-list">
            <header>
                <h2>Portfolio List</h2>
                <button className="back-button" onClick={() => navigate('/admin')}>
                    ← Back
                </button>
            </header>

            {portfolios.length === 0 ? (
                <p>No portfolios available.</p>
            ) : (
                <table className="portfolio-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {portfolios.map((portfolio) => (
                            <tr key={portfolio.id}>
                                <td className="center-text">{portfolio.title}</td>
                                <td className="center-text">{portfolio.description}</td>
                                <td className="center-text">
                                    <div className="action-buttons">
                                        <button
                                            onClick={() => navigate(`/admin/portfolio/${portfolio.id}/edit`)}
                                            className="edit-button"
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => navigate(`/admin/portfolio/${portfolio.id}/delete`)}
                                            className="delete-button"
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminPortfolioList;
