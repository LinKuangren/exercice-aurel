import React from 'react';
import { useParams } from 'react-router-dom';

import { useNotesStore } from '../store/notesStore';
import styles from '../styles/NoteView.module.css';

const NoteView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const note = useNotesStore((state) => state.notes.find((note) => note.id === id));

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <div className={styles.view}>
      <h1>{note.title}</h1>
      <p>{new Date(note.createdAt).toLocaleDateString()}</p>
      <p>{note.content}</p>
    </div>
  );
};

export default NoteView;
