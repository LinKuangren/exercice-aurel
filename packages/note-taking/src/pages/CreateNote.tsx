import React from 'react';
import NoteForm from '../components/NoteForm';
// import { useNotesStore } from '../store/notesStore';
// import { useRouter } from '@tanstack/react-router';
import styles from '../styles/NoteForm.module.css';

const CreateNote: React.FC = () => {
  const addNote = useNotesStore((state) => state.addNote);
  const router = useRouter();

  const handleSubmit = (title: string, content: string) => {
    addNote(title, content);
    router.history.push('/');
  };

  return (
    <div className={styles.formContainer}>
      <h1>Create Note</h1>
      <NoteForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateNote;
