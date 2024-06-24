import React from 'react';
import { Link } from 'react-router-dom';

import NoteList from '../components/note_list';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Les Notes</h1>
      <Link to="/create">Créer une note</Link>
      <NoteList/>
    </div>
  );
};

export default Home;
