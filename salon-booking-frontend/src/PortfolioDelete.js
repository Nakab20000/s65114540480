import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import authService from './authService';

const PortfolioDelete = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await authService.deletePortfolio(id);
            navigate('/admin/portfolio');  // เปลี่ยนเส้นทางไปยังหน้ารายการผลงานหลังจากลบ
        } catch (error) {
            console.error('Error deleting portfolio:', error);
        }
    };

    return (
        <div>
            <h2>Are you sure you want to delete this portfolio?</h2>
            <button onClick={handleDelete}>Yes, Delete</button>
            <button onClick={() => navigate('/admin/portfolio')}>Cancel</button>
        </div>
    );
};

export default PortfolioDelete;
