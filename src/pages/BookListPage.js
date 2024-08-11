import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography, Container } from "@mui/material";
import MenuListComposition from '../../components/MenuListComposition';
import AddButton from "../../components/AddButton";
import BookCard from "../../components/BookCard";
import { getAllBooks, updateBookById, deleteBookById, createBook } from "../../services/bookService";
import BookFormDialog from "../../components/BookFormDialog";
import CartNavButton from "../../components/CartNavButton";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

const BookListPage = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { cart, addToCart } = useContext(CartContext);
    const { admin } = useContext(AuthContext);

    const fetchBooks = async () => {
        try {
            const response = await getAllBooks();
            setBooks(response.data);
        } catch (error) {
            console.error('Failed to fetch books:', error);
        }
    };

    const handleAddBook = () => {
        setSelectedBook(null);
        setDialogOpen(true);
    }

    const handleEditBook = (bookId) => {
        const book = books.find((book) => book._id === bookId);
        setSelectedBook(book);
        setDialogOpen(true);
    }

    const handleSaveBook = async (book) => {
        try {
            if (selectedBook) {
                await updateBookById(selectedBook._id, book);
            } else {
              await createBook(book);
            }
            setDialogOpen(false);
          } catch (error) {
            alert(error.response.data.message);
            console.error('Failed to save book:', error);
          }
          fetchBooks();
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
    }

    const handleDeleteBook = async (bookId) => {
        try {
            const response = await deleteBookById(bookId);
            alert(response.message);
        } catch (error) {
            alert(error.response.data.message);
            console.error('Failed to delete book:', error);
        }
        fetchBooks();
    }

    const handleAddToCart = (bookId, title) => {
        addToCart(bookId, title);
    }

    useEffect(() => {
        fetchBooks();
    }, [])


    return(
        <Container sx={{ width: '100%' }}>
        <Typography variant="h4" align="center">Online Book Store</Typography>
        <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={1} margin={0}>
            <MenuListComposition />
            </Grid>
            <Grid item xs={9} >
            <Typography variant="h6" align="justify">Book List</Typography>
            </Grid>
            <Grid item xs={2} margin={0}>
            {admin && <AddButton onAdd={handleAddBook} buttonName={'Add Book'}/>}
            </Grid>
        </Grid>
        <Grid container spacing={2} mt={2}>
            {books.map((book) => {
                return(<Grid item xs={12} sm={6} md={4} key={book._id}>
                    <BookCard
                        book={book}
                        onView={() => navigate(`/books/${book._id}`)}
                        onEdit={handleEditBook}
                        onDelete={handleDeleteBook}
                        onAddToCart={handleAddToCart}
                    />
                </Grid>);
            })}
        </Grid>
        <BookFormDialog
            open={dialogOpen}
            onClose={handleDialogClose}
            onSave={handleSaveBook}
            book={selectedBook}
        />
    </Box>
    
    {cart.length!==0 && <CartNavButton />}
    </Container>
    );
};


export default BookListPage;