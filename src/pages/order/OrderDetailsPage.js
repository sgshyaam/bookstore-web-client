import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { getOrderById, updateOrderById } from '../../services/orderService';
import { Box } from '@mui/material';
import CartItemCard from '../../components/CartItemCard';

const OrderDetailsPage = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [books, setBooks] = useState(null);
    const [isEditedFlag, setIsEditedFlag] = useState(false);

    const navigate = useNavigate();
    

    const fetchOrderById = async (id) => {
        try {
            const response = await getOrderById(id);
            setOrder(response.data);
            setBooks(response.data.books)
        } catch (error) {
            console.error('Failed to fetch book by id:', error);
        }
    };

    useEffect(() => {
        console.log(orderId);
        fetchOrderById(orderId)
    }, [orderId]);

    if (!order) {
        return <div>Loading...</div>;
    }

    const handleNavigateBackFromOrderDetails = () => {
        navigate('/orders');
    }

    const handleRemoveOrderItem = (bookId) => {
        console.log('Order details page remove', bookId);
        setBooks((prev) => prev.filter((item) => item.book_id !== bookId));
        setIsEditedFlag(true);
    }

    const handleOrderItemEdit = (bookId, quantity) => {
        if (quantity < 1) {
            alert('Quantity must be at least 1.');
            return;
        }
        setBooks((prev) => {
            const bookIndex = prev.findIndex((item) => item.book_id === bookId);
            if (bookIndex === -1) {
                alert('Item not found in cart!');
                return prev;
            }

            const updatedCart = [...prev];
            updatedCart[bookIndex].quantity = quantity;

            return updatedCart.filter((item) => item.quantity > 0);
        });
        setIsEditedFlag(true);
        
    }

    const handleBooksUpdate = async () => {
        console.log('Order details page update');
        
    }



    return (
        <Container>
            <Typography variant="h4" gutterBottom align="center">Online Book Store</Typography>
        <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={1} margin={0}>
                <Button onClick={handleNavigateBackFromOrderDetails}>Back</Button>
            </Grid>
            <Grid item xs={9} >
            <Typography variant="h6" gutterBottom align="justify">Order Details</Typography>
            </Grid>
            <Grid item xs={2} margin={0}>
            </Grid>
        </Grid>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={2} margin={0}>
            </Grid>
            <Grid item xs={8} >
            <Typography variant="h6" gutterBottom align="center">Books List</Typography>
            </Grid>
            <Grid item xs={2} margin={0}>
            {isEditedFlag && 
            <Button size='small' variant="contained" color="primary" onClick={handleBooksUpdate}>Update</Button>}
            </Grid>
        </Grid>
            <Grid container spacing={2}>
                {books.map((book) => {
                return(<Grid item xs={12} sm={6} md={4} key={book.book_id}>
                    <CartItemCard
                        book={book}
                        onRemove={handleRemoveOrderItem}
                        onUpdate={handleOrderItemEdit}
                    />
                </Grid>);
            })}
            </Grid>
            </Box>
        </Container>
    );
};

export default OrderDetailsPage;
