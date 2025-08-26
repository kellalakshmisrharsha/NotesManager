const API_URL = 'http://localhost:8080/api/auth';

export const login = async (email, password) => {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    // Expect JSON with token and id
    const data = await res.json();
    console.log("Login response:", data);
    localStorage.setItem('token', data.token);
    if (data.id) {
        sessionStorage.setItem('userId', data.id);
    }
    if (data.username) {
        sessionStorage.setItem('username', data.username);
    }
    return data;
};

export const register = async (username, email, password) => {
    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });
    if (!res.ok) throw new Error('Registration failed');
    // Expect JSON with token and id
    const data = await res.json();
    localStorage.setItem('token', data.token);
    if (data.id) {
        sessionStorage.setItem('userId', data.id);
    }
    if (data.username) {
        sessionStorage.setItem('username', data.username);
    }
    return data;
};

export const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('userId');
};

export const getToken = () => localStorage.getItem('token');
export const getUsername = () => sessionStorage.getItem('username');
