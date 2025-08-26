import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [passwordHash, setPasswordHash] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        console.log('Register form submitted:', { username, email, passwordHash });
        try {
            const result = await register(username, email, passwordHash);
            console.log('Registration successful:', result);
            setSuccess('Registration successful! Please login.');
            setTimeout(() => {
                console.log('Navigating to /login');
                navigate('/login');
            }, 1500);
        } catch (err) {
            console.error('Registration failed:', err);
            setError('Registration failed');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)'
        }}>
            <div style={{
                background: '#fff',
                padding: '2.5rem 2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                width: '100%',
                maxWidth: '400px'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#4f46e5' }}>Create Account</h2>
                {error && <div style={{color: '#dc2626', marginBottom: '1rem', textAlign: 'center'}}>{error}</div>}
                {success && <div style={{color: '#16a34a', marginBottom: '1rem', textAlign: 'center'}}>{success}</div>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => {
                            setUsername(e.target.value);
                            console.log('Username changed:', e.target.value);
                        }}
                        required
                        style={{
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid #d1d5db',
                            fontSize: '1rem'
                        }}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value);
                            console.log('Email changed:', e.target.value);
                        }}
                        required
                        style={{
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid #d1d5db',
                            fontSize: '1rem'
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={passwordHash}
                        onChange={e => {
                            setPasswordHash(e.target.value);
                            console.log('Password changed:', e.target.value);
                        }}
                        required
                        style={{
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid #d1d5db',
                            fontSize: '1rem'
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: 'none',
                            background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                        }}
                    >
                        Register
                    </button>
                </form>
                <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#6b7280' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#4f46e5', textDecoration: 'underline' }}>Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
