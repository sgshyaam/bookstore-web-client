import api from '../utils/api'

export const getAllUsers = () => {
    return api.get('/users/');
}

export const getUserById = (userId) => {
    return api.get(`/users/${userId}`);
}
