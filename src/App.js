// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import AdminPortal from './components/AdminPortal';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPortal />} /> {/* Protected Admin Route */}
      </Routes>
    </Router>
  );
}

export default App;
