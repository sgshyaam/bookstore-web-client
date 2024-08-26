import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../components/LoginForm';
import { AuthContext } from '../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

const mockLoginUser = jest.fn();

const AuthProvider = ({ children }) => (
    <AuthContext.Provider value={{ loginUser: mockLoginUser }}>
        {children}
    </AuthContext.Provider>
);

describe('LoginForm', () => {
    beforeEach(() => {
        mockLoginUser.mockClear();
        mockNavigate.mockClear();
        window.alert = jest.fn();
    });

    test('renders login form fields and handles form submission', async () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <LoginForm />
                </AuthProvider>
            </MemoryRouter>
        );

        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(mockLoginUser).toHaveBeenCalledWith({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            });
        });

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    test('login failure', async () => {
        mockLoginUser.mockRejectedValueOnce(new Error('Login failed'));

        render(
            <MemoryRouter>
                <AuthProvider>
                    <LoginForm />
                </AuthProvider>
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Login failed!');
        });

        await waitFor(() => {
            expect(mockNavigate).not.toHaveBeenCalled();
        });
    });
});
