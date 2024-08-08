import api from '../utils/api'

export const getAllBooks = () => {
    return api.get('/books/');
}

export const getBookById = (bookId) => {
    return api.get(`/books/${bookId}`);
}

export const updateBookById = (bookId, payload) => {
    return api.put(`/books/${bookId}`, payload);
}

export const deleteBookById = (bookId) => {
    return api.delete(`/books/${bookId}`);
}

export const createBook = (payload) => {
    return api.post('/books/', payload);
}
