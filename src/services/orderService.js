import api from '../utils/api'

export const getAllOrders = () => {
    return api.get('/orders/');
}

export const getOrderById = (orderId) => {
    return api.get(`/orders/${orderId}`);
}

export const getOrdersByUser = (userId) => {
    return api.get(`/orders/${userId}/order`);
}

export const getOrderByUserById = (userId, orderId) => {
    return api.get(`/orders/${userId}/order/${orderId}`);
}

export const updateOrderById = (orderId, payload) => {
    return api.put(`/orders/${orderId}`, payload);
}

export const deleteOrderById = (orderId) => {
    return api.delete(`/orders/${orderId}`);
}

export const createOrder = (payload) => {
    return api.post('/orders/', payload);
}