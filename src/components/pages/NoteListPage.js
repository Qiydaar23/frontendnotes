import React from 'react'
import { useState, useEffect } from 'react'
import Listitem from '../Listitem'
import AddButton from '../AddButton'

const NoteListPage = () => {

    const [notes, setNotes] = useState([])

    const baseUrl = process.env.REACT_APP_API_URL;

    // const getNotes = async () => {
    //    const response = await fetch(`${baseUrl}/api/notes`)
    //    const data = await response.json()
    //    setNotes(data)
    // }

    useEffect(()=>{
        // getNotes()
        const getNotes = async () => {

          const response = await fetch(`${baseUrl}/api/notes`)
          const data = await response.json()
          setNotes(data)
       }
       getNotes()
    },[baseUrl])

  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className='notes-title'>Notes</h2>
        <p className='notes-count'>{notes.length}</p>
      </div>
      <div className="notes-list">
          {notes.map((note, id)=>(
              <Listitem note={note} key={id} />
          ))}
      </div>
      <AddButton />
    </div>
  )
}

export default NoteListPage