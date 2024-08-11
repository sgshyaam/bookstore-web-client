import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { Container, Typography, Grid, Button } from '@mui/material';
import { getAllOrders } from '../../services/orderService';
import OrderCard from '../../components/OrderCard';
import { deleteOrderById, updateOrderById } from '../../services/orderService';
import OrderFormDialog from '../../components/OrderFormDialog';

const OrderListPage = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const fetchAllOrders = async() => {
        try{
            const response = await getAllOrders();
            setOrders(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleNavigateBackFromOrders = () => {
        navigate('/books');
    }
    
    const handleEditOrder = (orderId) => {
        const order = orders.find((order) => order._id === orderId);
        setSelectedOrder(order);
        setDialogOpen(true);
    }

    const handleSaveOrder = async (order) => {
        console.log(order);
        try {
            if (selectedOrder) {
                await updateOrderById(selectedOrder._id, order);
            }
            setDialogOpen(false);
            fetchAllOrders();
          } catch (error) {
            alert(error.response.data.message);
            console.error('Failed to save order:', error);
          }
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
    }

    const handleDeleteOrder = async (orderId) => {
        try {
            await deleteOrderById(orderId);
            alert('Order deleted successfully!');
        } catch (error) {
            alert(error.response.data.message);
            console.error('Failed to delete order:', error);
        }
        fetchAllOrders();
    }

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom align="center">Online Book Store</Typography>
        <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={1} margin={0}>
                <Button onClick={handleNavigateBackFromOrders}>Back</Button>
            </Grid>
            <Grid item xs={9} >
            <Typography variant="h6" align="justify">Order List</Typography>
            </Grid>
            <Grid item xs={2} margin={0}>
            </Grid>
        </Grid>
            <Grid container spacing={2}>
                {orders.map((order) => (
                    <Grid item xs={12} sm={6} md={6} key={order._id}>
                        <OrderCard
                        order={order}
                        onEdit={handleEditOrder}
                        onDelete={handleDeleteOrder}
                    />
                    </Grid>
                ))}
            </Grid>
            <OrderFormDialog
            open={dialogOpen}
            onClose={handleDialogClose}
            onSave={handleSaveOrder}
            onDelete={handleDeleteOrder}
            order={selectedOrder}
        />
            </Box>
        </Container>
    );
};

export default OrderListPage;
