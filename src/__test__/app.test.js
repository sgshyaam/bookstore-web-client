import { render, screen } from '@testing-library/react';
import App from '../App';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const mockAuthContextValue = {
    user: null,
    setUser: jest.fn(),
    setAdmin: jest.fn(),
};

const mockCartContextValue = {
    cart: [],
    addToCart: jest.fn(),
};

test('renders learn react link', () => {
  render(
    <AuthContext.Provider value={mockAuthContextValue}>
      <CartContext.Provider value={mockCartContextValue}>
        <App />
      </CartContext.Provider>
    </AuthContext.Provider>
  );
  const linkElement = screen.getByRole('button', { name: 'Login' });
  expect(linkElement).toBeInTheDocument();
});