import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import PublicForm from './pages/publicForm';
import UserTable from './pages/userTable'
import Index from './pages/index';
import LoginPage from './pages/login';
import SubscriptionTable from './pages/subscriptionTable';

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
        <Route path="/admin/subscription" element={<PublicForm role="admin"/>} />
        <Route path="/admin/table/users" element={<ProtectedRoute><UserTable/></ProtectedRoute>} />
        <Route path="/admin/table/subscriptions" element={<ProtectedRoute><SubscriptionTable role="admin"/></ProtectedRoute>} />
        <Route path="/admin/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
