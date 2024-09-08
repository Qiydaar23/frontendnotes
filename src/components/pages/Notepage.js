import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const NotePage = () => {
    const { id: noteId } = useParams();
    const [note, setNote] = useState(null);

    useEffect(() => {
        const getNote = async () => {
            try {
                const response = await fetch(`/api/notes/${noteId}`);
                const data = await response.json();
                setNote(data);
            } catch (error) {
                console.error('Failed to fetch the note:', error);
            }
        };

        getNote();
    }, [noteId]);

    return (
        <p>{note?.body}</p>
    );
};

export default NotePage;
