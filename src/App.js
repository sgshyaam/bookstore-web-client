import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import BookListPage from './pages/BookListPage';
import { AuthContext } from './context/AuthContext';
import BookDetailsPage from './pages/BookDetailsPage';
import CartPage from './pages/CartPage';

function App() {
  const {user} = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/books" /> : <Navigate to="/login" replace/>} 
        />
        <Route path="/books" element={user ? <BookListPage /> : <Navigate to="/login" replace/>} />
        <Route path="/login" element={user ? <Navigate to="/books" /> : <LoginPage />} />
        <Route path="/books/:id" element={<BookDetailsPage />} />
        <Route path='/cart' element={user ? <CartPage /> : <Navigate to="/login" replace/>} />
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
    </Router>
  );
}

export default App;
