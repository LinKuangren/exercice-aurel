import React from 'react';
import NoteForm from '../components/NoteForm';
// import { useNotesStore } from '../store/notesStore';
// import { useParams, useRouter } from '@tanstack/react-router';
import styles from '../styles/NoteForm.module.css';

const EditNote: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const note = useNotesStore((state) => state.notes.find((note) => note.id === id));
  const updateNote = useNotesStore((state) => state.updateNote);
  const router = useRouter();

  if (!note) {
    return <div>Note not found</div>;
  }

  const handleSubmit = (title: string, content: string) => {
    updateNote(note.id, title, content);
    router.history.push('/');
  };

  return (
    <div className={styles.formContainer}>
      <h1>Edit Note</h1>
      <NoteForm initialTitle={note.title} initialContent={note.content} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditNote;
