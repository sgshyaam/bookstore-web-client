import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography, Container, Button } from "@mui/material";
import CartItemCard from '../components/CartItemCard'

const CartPage = () => {
    const navigate = useNavigate();
    const { cart, addToCart, removeCart, clearCart } = useContext(CartContext);

    const handleAddCartItem = () => {

    }

    const handleRemoveCartItem = () => {

    }

    const handleNavigateBackFromCart = () => {
        navigate(-1);
    }
    
    return(
        <Container>
            <Typography variant="h4" align="center">Online Book Store</Typography>
        <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={1} margin={0}>
                <Button onClick={handleNavigateBackFromCart}>Back</Button>
            </Grid>
            <Grid item xs={11} >
            <Typography variant="h6" align="justify">Cart Page</Typography>
            </Grid>
        </Grid>
        <Grid container spacing={2} mt={2} >
            {cart.map((book) => {
                return(<Grid item xs={12} sm={6} md={12} key={book._id}>
                    <CartItemCard
                        book={book}
                        onAdd={handleAddCartItem}
                        onRemove={handleRemoveCartItem}
                        onClear={() => clearCart()}
                    />
                </Grid>);
            })}
        </Grid>
    </Box>
    </Container>
        
    );
}

export default CartPage;