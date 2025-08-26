import React, { useEffect, useState } from 'react';
import { fetchNotes, createNote, updateNote, deleteNote } from '../services/notesService';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function NotesPage() {
    const [notes, setNotes] = useState([]);
    const [form, setForm] = useState({ title: '', content: '' });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const loadNotes = async () => {
        try {
            setError('');
            setNotes(await fetchNotes());
        } catch {
            setError('Failed to load notes');
        }
    };

    useEffect(() => { loadNotes(); }, []);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateNote(editingId, form);
            } else {
                await createNote(form);
            }
            setForm({ title: '', content: '' });
            setEditingId(null);
            loadNotes();
        } catch {
            setError('Failed to save note');
        }
    };

    const handleEdit = note => {
        setForm({ title: note.title, content: note.content });
        setEditingId(note.id);
    };

    const handleDelete = async id => {
        try {
            await deleteNote(id);
            loadNotes();
        } catch {
            setError('Failed to delete note');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
            padding: '2rem'
        }}>
            <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                background: '#fff',
                borderRadius: '16px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                padding: '2rem'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem'
                }}>
                    <h2 style={{ color: '#4f46e5' }}>Your Notes</h2>
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: '0.5rem 1.25rem',
                            borderRadius: '8px',
                            border: 'none',
                            background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            cursor: 'pointer'
                        }}
                    >
                        Logout
                    </button>
                </div>
                {error && <div style={{color: '#dc2626', marginBottom: '1rem', textAlign: 'center'}}>{error}</div>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    <input
                        name="title"
                        placeholder="Title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        style={{
                            flex: '1 1 200px',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid #d1d5db',
                            fontSize: '1rem'
                        }}
                    />
                    <textarea
                        name="content"
                        placeholder="Content"
                        value={form.content}
                        onChange={handleChange}
                        required
                        rows={1}
                        style={{
                            flex: '2 1 300px',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid #d1d5db',
                            fontSize: '1rem',
                            resize: 'vertical'
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            border: 'none',
                            background: editingId
                                ? 'linear-gradient(90deg, #f59e42 0%, #fbbf24 100%)'
                                : 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            minWidth: '120px'
                        }}
                    >
                        {editingId ? 'Update' : 'Add'} Note
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={() => { setEditingId(null); setForm({ title: '', content: '' }); }}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '8px',
                                border: 'none',
                                background: 'linear-gradient(90deg, #e11d48 0%, #f43f5e 100%)',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                minWidth: '120px'
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </form>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {notes.map(note => (
                        <div key={note.id} style={{
                            background: '#f3f4f6',
                            borderRadius: '12px',
                            padding: '1.25rem',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}>
                            <h3 style={{ margin: 0, color: '#4f46e5' }}>{note.title}</h3>
                            <p style={{ margin: 0, color: '#374151', whiteSpace: 'pre-wrap' }}>{note.content}</p>
                            <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={() => handleEdit(note)}
                                    style={{
                                        flex: 1,
                                        padding: '0.5rem',
                                        borderRadius: '6px',
                                        border: 'none',
                                        background: 'linear-gradient(90deg, #f59e42 0%, #fbbf24 100%)',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(note.id)}
                                    style={{
                                        flex: 1,
                                        padding: '0.5rem',
                                        borderRadius: '6px',
                                        border: 'none',
                                        background: 'linear-gradient(90deg, #e11d48 0%, #f43f5e 100%)',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NotesPage;
