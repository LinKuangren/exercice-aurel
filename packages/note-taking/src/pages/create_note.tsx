import React from 'react';
import { useNavigate } from 'react-router-dom';

import NoteForm from '../components/note_form';
import { useNotesStore } from '../store/notesStore';

const CreateNote: React.FC = () => {
  const addNote = useNotesStore((state) => state.addNote);
  const navigate = useNavigate();

  const handleSubmit = (title: string, content: string) => {
    addNote(title, content);
    navigate('/');
  };

  return (
    <div>
      <h1>Créer une Note</h1>
      <NoteForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateNote;
