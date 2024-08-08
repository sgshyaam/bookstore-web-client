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

const CartItemCard = ({ book, onAdd, onRemove, onClear }) => {
    return(
        <Card key={book.id}>
            <CardContent>
                <Typography variant='h6'>{book.title}</Typography>
            </CardContent>
            <CardActions fullwidth>
            <Stack direction="row" spacing={2}>
                <Button onClick={() => onRemove(book._id)}>
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
                <Button onClick={() => onAdd(book._id)}>
                    <AddCircleRounded />
                </Button>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent={"right"} sx={{width:'100%'}}>
                <Button color='error' onClick={() => onClear(book._id)}>
                    <DeleteRounded />
                </Button>             
            </Stack>
            </CardActions>
        </Card>
    );
}

export default CartItemCard;