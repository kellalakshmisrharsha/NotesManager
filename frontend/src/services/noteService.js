import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        console.log('Login attempt:', { email, password });
        try {
            const result = await login(email, password);
            console.log('Login successful:', result);
            // Store only the user id in sessionStorage
            if (result && result.id) {
                sessionStorage.setItem('userId', result.id);
            }
            navigate('/notes');
        } catch (err) {
            console.error('Login failed:', err);
            setError(err?.response?.data?.message || 'Invalid credentials');
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
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#4f46e5' }}>Login</h2>
                {error && <div style={{color: '#dc2626', marginBottom: '1rem', textAlign: 'center'}}>{error}</div>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
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
                        value={password}
                        onChange={e => setPassword(e.target.value)}
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
                        Login
                    </button>
                </form>
                <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#6b7280' }}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: '#4f46e5', textDecoration: 'underline' }}>Register</Link>
                </p>
            </div>
        </div>
    );
}


export default Login;