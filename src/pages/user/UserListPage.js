import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { Container, Typography, Grid, Card, CardContent, Button, CardActions } from '@mui/material';
import { getAllUsers } from '../../services/userService';

const UserListPage = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    const fetchAllUsers = async() => {
        try{
            const response = await getAllUsers();
            console.log(response.data);
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleNavigateBackFromUsers = () => {
        navigate('/books');
    }

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom align="center">Online Book Store</Typography>
        <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={1} margin={0}>
                <Button onClick={handleNavigateBackFromUsers}>Back</Button>
            </Grid>
            <Grid item xs={9} >
            <Typography variant="h6" align="justify">User List</Typography>
            </Grid>
            <Grid item xs={2} margin={0}>
            </Grid>
        </Grid>
            <Grid container spacing={2}>
                {users.map((user) => (
                    <Grid item xs={12} sm={6} md={6} key={user._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">User name: {user.username}</Typography>
                                <Typography variant="body2">User ID: {user._id}</Typography>
                                <Typography variant="body2">Email: {user.email}</Typography>
                                <Typography variant="body2">Admin: {user.admin ? 'Yes': 'No'}</Typography>
                            </CardContent>
                            <CardActions style={{width:'90%', justifyContent:'right'}}>
                            <Button onClick={()=> {return navigate(`/users/${user._id}/orders/`)}}
                             size='small' 
                             variant="contained" 
                             color="primary"
                             >
                                View Orders
                            </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            </Box>
        </Container>
    );
};

export default UserListPage;
