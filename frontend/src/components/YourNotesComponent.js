import React from 'react';
import { getUsername } from '../services/authService';

function YourNotesComponent() {
    const username = getUsername();

    return (
        <div>
            <h2 style={{ textAlign: 'center', margin: '1rem 0' }}>
                Welcome, {username ? username : 'User'}!
            </h2>
            {/* ...existing notes UI... */}
        </div>
    );
}

export default YourNotesComponent;