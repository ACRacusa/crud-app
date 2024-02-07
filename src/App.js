import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './components/NotFound';
import Todo from './pages/Todo';
const App = () => {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Todo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes> 
    </Router>
  );
};

export default App;