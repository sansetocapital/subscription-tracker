import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import PublicForm from './pages/publicForm';
import AdminPanel from './pages/adminPanel';
import Index from './pages/index';
import LoginPage from './pages/login';

function App() {
  const ProtectedRoute = ({children}) => {
    const authToken = localStorage.getItem('authToken');
    return authToken? children: <Navigate to='/'/>
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index></Index>} />
        <Route path="/user/subscription" element = {<PublicForm role="user"/>} />
        <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
        <Route path="/admin/subscription" element={<PublicForm role="admin"/>} />
        <Route path="/admin/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
