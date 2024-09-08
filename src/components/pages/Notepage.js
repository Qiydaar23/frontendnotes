import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

const NotePage = () => {
    const { id: noteId } = useParams();
    const [note, setNote] = useState(null);

    const Navigate = useNavigate()

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


        const updateNote = async () => {
            try {
                const response = await fetch(`/api/notes/${noteId}/update/`,{
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(note)
                });
                const data = await response.json();
                setNote(data);
            } catch (error) {
                console.error('Failed to fetch the note:', error);
            }
        };

        const handleSubmit = (e) => {
            e.preventDefault()
            updateNote()
            Navigate("/")
        }

    return (
        <div className='note'>
            <div className='note-header'>
               <Link to="/">
               <h1 onClick={handleSubmit}>(Back)</h1>
               </Link>

            </div>
             <textarea onChange={(e) =>{setNote({...note, 'body':e.target.value })}}  defaultValue={note?.body}></textarea>
        </div>

    );
};

export default NotePage;
