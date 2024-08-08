import React, { createContext, useState } from "react";

export const CartContext = createContext(); 

export const CartProvider  = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (bookId, title) => {
        const book = {
            title,
            book_id: bookId,
            quantity: 1,
        };
        setCart((prev) => {
            if(!prev) return [book];

            const bookIndex = prev.findIndex((item) => item.book_id === book.book_id)

            if(bookIndex === -1) {
                return [...prev, book];
            } else {
                const updatedCart = [...prev];
                updatedCart[bookIndex].quantity += 1;
                return updatedCart;
            }
        });
    }

    const removeFromCart = (bookId) => {
        setCart((prev) => {
            const bookIndex = prev.findIndex((item) => item.book_id === bookId);

            const updatedCart = [...prev];
            if(updatedCart[bookIndex].quantity === 0) {
                alert('Item is already removed from cart!');
            } else {
                updatedCart[bookIndex].quantity -=1;
            }
            updatedCart.filter((item) => item.quantity!==0);
            return updatedCart;
        })
    }

    const clearCart = () => setCart([]);

    return(
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );

}