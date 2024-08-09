import React, { useContext } from "react";
import {
    Card,
    CardActions,
    CardContent,
    Typography,
    Button,
 } from "@mui/material";
import Stack from '@mui/material/Stack';
import { AuthContext } from "../context/AuthContext";


const BookCard = ({ book, onView, onEdit, onDelete, onAddToCart}) => {

    const { admin } = useContext(AuthContext);
    
    const inlineStyle = {position: 'static'};
    return(
        <Card key={book.id}>
            <CardContent>
                <Typography variant='h6'>{book.title}</Typography>
                <Typography variant='body2' color='textSecondary'>{book.author}</Typography>
            </CardContent>
            <CardActions>
            <Stack direction="row" spacing={1}>
                <Button size='small' variant='contained' style={inlineStyle} onClick={() => onAddToCart(book._id, book.title)}>
                    Add to cart
                </Button>
                <Button size='small' color='primary' style={inlineStyle} onClick={() => onView(book._id)}>
                    View
                </Button>
                {admin && <Button size='small' color='secondary' style={inlineStyle} onClick={() => onEdit(book._id)}>
                    Edit
                </Button>}
                {admin && <Button size='small' color='error' style={inlineStyle} onClick={() => onDelete(book._id)}>
                    Delete
                </Button>}
            </Stack>
            </CardActions>
        </Card>

    );

}

export default BookCard;