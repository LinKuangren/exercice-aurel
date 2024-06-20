// import create from 'zustand';
// import { persist } from 'zustand/middleware';
// import { v4 as uuidv4 } from 'uuid';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface NotesState {
  notes: Note[];
  addNote: (title: string, content: string) => void;
  updateNote: (id: string, title: string, content: string) => void;
  deleteNote: (id: string) => void;
}

export const useNotesStore = create<NotesState>(
  persist(
    (set) => ({
      notes: [],
      addNote: (title, content) =>
        set((state) => {
          const newNote = {
            id: uuidv4(),
            title,
            content,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          return { notes: [...state.notes, newNote] };
        }),
      updateNote: (id, title, content) =>
        set((state) => {
          const updatedNotes = state.notes.map((note) =>
            note.id === id ? { ...note, title, content, updatedAt: new Date() } : note
          );
          return { notes: updatedNotes };
        }),
      deleteNote: (id) =>
        set((state) => {
          const filteredNotes = state.notes.filter((note) => note.id !== id);
          return { notes: filteredNotes };
        }),
    }),
    {
      name: 'notes-storage',
    }
  )
);
