import React from 'react';
import { useNavigate } from 'react-router-dom';

import NoteView from '../components/note_view';

const ViewNote: React.FC = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div>
      <NoteView />
      <button onClick={handleHomeClick}>Accueil</button>
    </div>
  );
};

export default ViewNote;
