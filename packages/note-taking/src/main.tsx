import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateNote from './pages/CreateNote';
import ViewNote from './pages/ViewNote';
import EditNote from './pages/EditNote';

const container = document.querySelector('#root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateNote />} />
          <Route path="/view/:id" element={<ViewNote />} />
          <Route path="/edit/:id" element={<EditNote />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}
