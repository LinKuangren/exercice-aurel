import React, { useState } from 'react';
// import { useParams } from '@tanstack/react-router';
import { useNotesStore } from '../store/notesStore';
// import ReactMarkdown from 'react-markdown';
import styles from '../styles/NoteView.module.css';

const NoteView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const note = useNotesStore((state) => state.notes.find((note) => note.id === id));
  const [showPreview, setShowPreview] = useState(false);

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <div className={styles.view}>
      <h1>{note.title}</h1>
      <p>{new Date(note.createdAt).toLocaleDateString()}</p>
      <button onClick={() => setShowPreview((prev) => !prev)}>
        {showPreview ? 'Show Markdown' : 'Show Preview'}
      </button>
      {showPreview ? <ReactMarkdown>{note.content}</ReactMarkdown> : <pre>{note.content}</pre>}
    </div>
  );
};

export default NoteView;
