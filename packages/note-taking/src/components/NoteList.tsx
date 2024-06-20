import React from 'react';
// import { Link } from '@tanstack/react-router';
// import { useNotesStore } from '../store/notesStore';
import styles from '../styles/NoteList.module.css';

const NoteList: React.FC = () => {
  const notes = useNotesStore((state) => state.notes);
  const deleteNote = useNotesStore((state) => state.deleteNote);

  return (
    <div className={styles.list}>
      {notes.map((note) => (
        <div key={note.id} className={styles.note}>
          <h2>{note.title}</h2>
          <p>{new Date(note.createdAt).toLocaleDateString()}</p>
          <Link to={`/view/${note.id}`}>View</Link>
          <Link to={`/edit/${note.id}`}>Edit</Link>
          <button onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
