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
                if (noteId === 'new') return
                const response = await fetch(`/api/notes/${noteId}`);
                const data = await response.json();
                setNote(data);
            } catch (error) {
                console.error('Failed to fetch the note:', error);
            }
        };

        getNote();
    }, [noteId]);


    const CreateNote = async () => {
        try {
            const response = await fetch(`/api/notes/`,{
                method: "POST",
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
            if(noteId !== 'new' && note.body === ''){
                deleteNote()
            }else if(noteId !== 'new'){
                updateNote()
            }else if (noteId === 'new' && note.body !== null){
                CreateNote()
            }
            // updateNote()
            Navigate("/")
        }

        // const handlechange = (value) =>{
        //     setNote(note => ({...note, value}))
        // }


        const deleteNote = async () => {
            fetch(`/api/notes/${noteId}/delete/`, {
                method:'DELETE',
                'headers': {
                    'Content-Type': 'application/json'
                }

            })
            Navigate("/")
        }

    return (
        <div className='note'>
            <div className='note-header'>
               <Link to="/">
               <h1 onClick={handleSubmit}>(Back)</h1>
               </Link>
               {noteId !== 'new' ? (<button onClick={deleteNote}>Delete</button>) : (<button onClick={handleSubmit}>Done</button>) }
               {/* <button onClick={deleteNote}>Delete</button> */}

            </div>
             <textarea onChange={(e) =>{setNote({...note, 'body':e.target.value })}}  value={note?.body}></textarea>
        </div>

    );
};

export default NotePage;
