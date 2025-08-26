import { getToken } from './authService';

const API_URL = 'http://localhost:8080/api/notes';

const authHeader = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
});

export const fetchNotes = async () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) throw new Error('User ID not found in session');
    const res = await fetch(`${API_URL}?userId=${userId}`, { headers: authHeader() });
    if (!res.ok) throw new Error('Failed to fetch notes');
    return await res.json();
};

export const createNote = async (note) => {
    console.log('Creating note:', note);
    const userId = sessionStorage.getItem('userId');
    console.log('User ID from sessionStorage:', userId);
    if (!userId) throw new Error('User ID not found in session');
    const res = await fetch(`${API_URL}/create?userId=${userId}`, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(note),
    });
    if (!res.ok) {
        const errorText = await res.text();
        console.error('Failed to create note:', errorText);
        throw new Error('Failed to create note');
    }
    const data = await res.json();
    console.log('Note saved (frontend):', data);
    return data;
};

export const updateNote = async (id, note) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(note),
    });
    if (!res.ok) throw new Error('Failed to update note');
    return await res.json();
};

export const deleteNote = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: authHeader(),
    });
    if (!res.ok) throw new Error('Failed to delete note');
};
