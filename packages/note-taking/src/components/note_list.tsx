import React from 'react';
import { Link } from 'react-router-dom';

import { useNotesStore } from '../store/notesStore';
// import styles from '../styles/NoteList.module.css';

const NoteList: React.FC = () => {
  const notes = useNotesStore((state) => state.notes);
  const deleteNote = useNotesStore((state) => state.deleteNote);

  return (
    <div>
      {notes.map((note) => (
        <div key={note.id} >
          <h2>{note.title}</h2>
          <p>{new Date(note.createdAt).toLocaleDateString()}</p>
          <Link to={`/view/${note.id}`}>Voir</Link>
          <br />
          <Link to={`/edit/${note.id}`}>Modifier</Link>
          <button onClick={() => deleteNote(note.id)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
