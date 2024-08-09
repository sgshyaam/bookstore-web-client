import React, { useState, useEffect, useContext } from "react";
import { getBookById, deleteBookById, updateBookById } from "../../services/bookService";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import {
    Container,
    Typography,
    Button,
 } from "@mui/material";
 import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import BookFormDialog from "../../components/BookFormDialog";
import { CartContext } from "../../context/CartContext";
import CartNavButton from "../../components/CartNavButton";
import { AuthContext } from "../../context/AuthContext";


const BookDetailsPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();
    const { cart, addToCart } = useContext(CartContext);
    const { user, admin } = useContext(AuthContext);

    const fetchBookById = async (id) => {
        try {
            const response = await getBookById(id);
            setBook(response.data);
        } catch (error) {
            console.error('Failed to fetch book by id:', error);
            if(!user) {
                <Navigate to="/login" replace/>
                navigate('/login');
            }
        }
    };

    const handleEditBook = () => {
        setDialogOpen(true);
    }

    const handleSaveBook = async (bookUpdate) => {
        try {
            await updateBookById(book._id, bookUpdate);
            fetchBookById(book._id);
            setDialogOpen(false);
        
          } catch (error) {
            alert(error.response.data.message || 'Failed to save book');
            console.error('Failed to save book:', error);
          }
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
        console.log('close');
    }

    const handleDeleteBook = async () => {
        try {
            const response = await deleteBookById(book._id);
            console.log(response.message);
            navigate('/');
        } catch (error) {
            alert(error.response.data.message);
            console.error('Failed to delete book:', error);
        }
    }


    useEffect(() => {
        fetchBookById(id);
    }, [id]);


    return(
        <Container>
            {book ? (
                <>
                <Grid container marginTop={6} rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={8} margin={1}>
                        <Button size='small' color='primary' variant='outlined' onClick={() => navigate('/')}>
                            Back
                        </Button>
                    </Grid>
                </Grid>
                <Box 
                  height={800}
                  width={100}
                  paddingTop={5}
                  my={4}
                  alignItems="center"
                  sx={{ height: '100%', width: '100%', border: '2px solid grey' }}>
                    
                    <Grid container rowSpacing={2}>
                        <Grid item xs={12} margin={1} paddingLeft={5} paddingRight={5}>
                            <Typography variant='h3' gutterBottom>{book.title}</Typography>
                            <Typography variant='overline' display="block" gutterBottom>{book.author}</Typography>
                            <Typography variant='subtitle2' gutterBottom>{`Description: ${book.description}`}</Typography>
                            <Typography variant='body2'>{`Cost: ₹${book.price}`}</Typography>
                        </Grid>
                        <Grid item xs={12} margin={1}>
                        <Stack direction="row" spacing={2} justifyContent={"right"}>
                            <Button size='small' color='primary' variant='contained' onClick={() => addToCart(book._id, book.title)}>
                                Add to cart</Button>
                            {admin &&<Button size='small' variant='outlined' onClick={handleEditBook}>
                                Edit</Button>}
                            {admin &&<Button size='small' color='error' variant='contained' onClick={handleDeleteBook}>
                                Delete</Button>}
                        </Stack>
                        </Grid>
                    </Grid>
                    <BookFormDialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                    onSave={handleSaveBook}
                    book={book}
                    />
                </Box>
                </>
            ) :(
                <Box sx={{ width: '100%' }}>
                    <Typography variant='body1'>Loading...</Typography>
                </Box>
            )}
            
        {cart.length!==0 && <CartNavButton />}
        </Container>
    );

}

export default BookDetailsPage;