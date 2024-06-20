import React from 'react';
import NoteView from '../components/NoteView';
import styles from '../styles/NoteView.module.css';

const ViewNote: React.FC = () => {
  return (
    <div className={styles.viewContainer}>
      <NoteView />
    </div>
  );
};

export default ViewNote;
