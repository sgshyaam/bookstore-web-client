import React, { createContext, useState } from "react";

export const CartContext = createContext(); 

export const CartProvider  = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (bookId, title) => {
        setCart((prev) => {
            const existingBookIndex = prev.findIndex((item) => item.book_id === bookId);

            if (existingBookIndex === -1) {
                return [...prev, { book_id: bookId, title, quantity: 1 }];
            } else {
                const updatedCart = [...prev];
                updatedCart[existingBookIndex].quantity += 1;
                return updatedCart;
            }
        });
    };

    const removeFromCart = (bookId) => {
        setCart((prev) => prev.filter((item) => item.book_id !== bookId));
    };

    const clearCart = () => setCart([]);

    const updateQuantity = (bookId, quantity) => {
        if (quantity < 1) {
            alert('Quantity must be at least 1.');
            return;
        }
        setCart((prev) => {
            const bookIndex = prev.findIndex((item) => item.book_id === bookId);
            if (bookIndex === -1) {
                alert('Item not found in cart!');
                return prev;
            }

            const updatedCart = [...prev];
            updatedCart[bookIndex].quantity = quantity;

            return updatedCart.filter((item) => item.quantity > 0);
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );

}