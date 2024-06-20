import React from 'react';
// import { Link } from '@tanstack/react-router';
import NoteList from '../components/NoteList';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <h1>My Notes</h1>
      <Link to="/create">Create New Note</Link>
      <NoteList />
    </div>
  );
};

export default Home;
