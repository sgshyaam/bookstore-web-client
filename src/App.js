import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import BookListPage from './pages/book/BookListPage';
import { AuthContext } from './context/AuthContext';
import BookDetailsPage from './pages/book/BookDetailsPage';
import CartPage from './pages/CartPage';
import OrderListPage from './pages/order/OrderListPage';
import OrderDetailsPage from './pages/order/OrderDetailsPage';
import UserListPage from './pages/user/UserListPage';
import UserOrderListPage from './pages/order/UserOrderListPage';

function App() {
  const {user, admin} = useContext(AuthContext);
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
        <Route path="/orders" element={user ? ( admin ? <OrderListPage />: <p>Not Authorised</p>): <Navigate to="/login" replace/>} />
        <Route path="/orders/:orderId" element={user ? ( admin ? <OrderDetailsPage />: <p>Not found</p>): <Navigate to="/login" replace/>} />
        <Route path='/cart' element={user ? <CartPage /> : <Navigate to="/login" replace/>} />
        <Route path="/users" element={user ? ( admin ? <UserListPage />: <p>Not Authorised</p>): <Navigate to="/login" replace/>} />
        <Route path="/users/:userId/orders" element={user ? ( admin ? <UserOrderListPage />: <p>Not Authorised</p>): <Navigate to="/login" replace/>} />
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
    </Router>
  );
}

export default App;
