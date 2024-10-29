import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentManager from './components/StudentManager';
import StudentDetail from './components/StudentDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentManager />} />
        <Route path="/student/:id" element={<StudentDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
