import api from '../utils/api'

export const login = (credentials) => {
    return api.post('/users/login', credentials);
}

export const logout = () => {
    return api.post('/users/logout');
}