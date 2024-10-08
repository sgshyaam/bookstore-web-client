import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography, Container, Button } from "@mui/material";
import CartItemCard from '../components/CartItemCard'
import { createOrder } from "../services/orderService";

const CartPage = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
    const checkoutStyle = {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      };

    const handleRemoveCartItem = (bookId) => {
        removeFromCart(bookId);
    }

    const handleCartItemUpdate = (bookId, quantity) => {
        if(bookId !== null) {
            updateQuantity(bookId, quantity);
        }
    }

    const handleNavigateBackFromCart = () => {
        navigate('/');
    }

    const handleCheckout = async() => {
        const order = {
            books: cart,
        };
        try {
            const response = await createOrder(order);
            alert(`Order created successfully !`, response.data);
            clearCart();
        } catch(error) {
            console.error(error)
        }

    }
    
    return(
        <Container>
            <Typography variant="h4" align="center">Online Book Store</Typography>
        <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={1} margin={0}>
                <Button onClick={handleNavigateBackFromCart}>Back</Button>
            </Grid>
            <Grid item xs={9} >
            <Typography variant="h6" align="justify">Cart Page</Typography>
            </Grid>
            <Grid item xs={2} margin={0}>
                <Button variant='contained' color='error' onClick={()=> clearCart()}>Clear All</Button>
            </Grid>
        </Grid>
        <Grid container spacing={2} mt={2} >
            {cart.map((book) => {
                return(<Grid item xs={12} sm={6} md={12} key={book.book_id}>
                    <CartItemCard
                        book={book}
                        onRemove={handleRemoveCartItem}
                        onUpdate={handleCartItemUpdate}
                    />
                </Grid>);
            })}
        </Grid>
    </Box>
    {cart.length!==0 && <Button variant="contained" color="primary" style={checkoutStyle} onClick={handleCheckout}>Checkout</Button>}
    </Container>
        
    );
}

export default CartPage;