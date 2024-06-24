import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CreateNote from './pages/create_note';
import EditNote from './pages/edit_note';
import Home from './pages/home';
import ViewNote from './pages/view_note';

const container = document.querySelector('#root');
if (!container) throw new Error('Container element does not exist.')

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/create" element={<CreateNote/>} />
        <Route path="/view/:id" element={<ViewNote/>} />
        <Route path="/edit/:id" element={<EditNote/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
