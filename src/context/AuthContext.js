import React, { createContext, useState, useEffect } from 'react';
import { login, logout } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if(savedUser) setUser(JSON.parse(savedUser))
    }, []);

    useEffect(() => {
        if (!user) {
            setAdmin(null);
        } else if (user.admin) {
            setAdmin(true);
        } else {
            setAdmin(false);
        }
    }, [user])

    const loginUser = async (credentials) => {
        try {
            const response = await login(credentials);
            const { accessToken, user } = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', accessToken);
            setUser(user);
            if(user.admin === true) setAdmin(true);
            return user;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    const logoutUser = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setAdmin(false);
    }

    return(
        <AuthContext.Provider value={{ user, admin, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}