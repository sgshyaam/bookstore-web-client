import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import { Container, Typography, Grid, Card, CardContent, Button, CardActions } from '@mui/material';
import { getOrdersByUser } from '../../services/orderService';
import OrderCard from '../../components/OrderCard';

const UserOrderListPage = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async(userId) => {
        try{
            const response = await getOrdersByUser(userId);
            console.log(response.data);
            setOrders(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleNavigateBackFromOrders = () => {
        navigate(-1);
    }

    useEffect(() => {
        fetchAllOrders(userId);
    }, [userId]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom align="center">Online Book Store</Typography>
        <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={1} margin={0}>
                <Button onClick={handleNavigateBackFromOrders}>Back</Button>
            </Grid>
            <Grid item xs={9} >
            <Typography variant="h6" align="justify">User Order List</Typography>
            </Grid>
            <Grid item xs={2} margin={0}>
            </Grid>
        </Grid>
            <Grid container spacing={2}>
                {orders.map((order) => (
                    <Grid item xs={12} sm={6} md={6} key={order._id}>
                        <OrderCard
                        order={order}
                    />
                    </Grid>
                ))}
            </Grid>
            </Box>
        </Container>
    );
};

export default UserOrderListPage;
