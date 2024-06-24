import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import NoteForm from '../components/note_form';
import { useNotesStore } from '../store/notesStore';

const EditNote: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const note = useNotesStore((state) => state.notes.find((note) => note.id === id));
  const updateNote = useNotesStore((state) => state.updateNote);
  const navigate = useNavigate();

  if (!note) {
    return <div>Aucune note trouvé.</div>;
  }

  const handleSubmit = (title: string, content: string) => {
    updateNote(note.id, title, content);
    navigate('/');
  };

  return (
    <div>
      <h1>Modifier la Note</h1>
      <NoteForm initialTitle={note.title} initialContent={note.content} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditNote;
