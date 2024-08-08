import React from "react";
import {
    Card,
    CardActions,
    CardContent,
    Typography,
    Button,
 } from "@mui/material";
import Stack from '@mui/material/Stack';


const BookCard = ({ book, onView, onEdit, onDelete, onAddToCart}) => {
    return(
        <Card key={book.id}>
            <CardContent>
                <Typography variant='h6'>{book.title}</Typography>
                <Typography variant='body2' color='textSecondary'>{book.author}</Typography>
            </CardContent>
            <CardActions>
            <Stack direction="row" spacing={1}>
                <Button size='small' color='primary' onClick={() => onView(book._id)}>
                    View
                </Button>
                <Button size='small' color='secondary' onClick={() => onEdit(book._id)}>
                    Edit
                </Button>
                <Button size='small' color='primary' onClick={() => onDelete(book._id)}>
                    Delete
                </Button>
                <Button size='small' variant='contained' onClick={() => onAddToCart(book._id, book.title)}>
                    Add to cart
                </Button>
            </Stack>
            </CardActions>
        </Card>

    );

}

export default BookCard;