import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        // Front-end validation
        if (!email) {
            setError('Email is required');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Invalid email format');
            return;
        }

        try {
            const response = await axios.post('http://3.228.97.110:9000/api', { email });
            if (response.status === 200) {
                setMessage('Form Submitted');
            }
        } catch (err) {
            if (err.response && err.response.status === 422) {
                setError('Email cannot end with @ez.works');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />
            <button type="submit">Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
        </form>
    );
};

export default Form;