import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RequestReset = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/request-reset-password/", { email });
            setMessage(response.data.message);
            console.log(response.data.token);
            // นำทางไป VerifyResetCode พร้อมส่ง email ผ่าน query string
            navigate(`/verify-reset-code?email=${email}`);
        } catch (error) {
            setMessage("Error sending reset code");
        }
    };

    return (
        <div>
            <h2>Request Password Reset</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <button type="submit">Send Reset Code</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default RequestReset;
