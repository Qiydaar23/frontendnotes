import React from 'react'
import { useState, useEffect } from 'react'
import Listitem from '../Listitem'

const NoteListPage = () => {

    const [notes, setNotes] = useState([])



    const getNotes = async () => {
       const response = await fetch('/api/notes')
       const data = await response.json()
       setNotes(data)
    }

    useEffect(()=>{
        getNotes()
    },[])

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
    </div>
  )
}

export default NoteListPage