import React from "react";
import {
    Card,
    CardActions,
    CardContent,
    Typography,
    Button,
    TextField,
 } from "@mui/material";
import Stack from '@mui/material/Stack';
import {AddCircleRounded, RemoveRounded, DeleteRounded} from "@mui/icons-material";

const CartItemCard = ({ book, onRemove, onUpdate }) => {
    return(
        <Card key={book.book_id}>
            <CardContent>
                <Typography variant='h6'>{book.title}</Typography>
            </CardContent>
            <CardActions>
            <Stack direction="row" spacing={2}>
                <Button onClick={()=>onUpdate(book.book_id, book.quantity - 1)}>
                    <RemoveRounded />
                </Button>
                <TextField
                    id="filled-read-only-input"
                    value={book.quantity}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    size="small"
                    sx={{width:100}}
                />
                <Button onClick={()=>onUpdate(book.book_id, book.quantity + 1)}>
                    <AddCircleRounded />
                </Button>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent={"right"} sx={{width:'100%'}}>
                <Button color='error' onClick={()=>onRemove(book.book_id)}>
                    <DeleteRounded />
                </Button>             
            </Stack>
            </CardActions>
        </Card>
    );
}

export default CartItemCard;