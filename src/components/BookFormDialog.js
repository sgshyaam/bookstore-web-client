import React, { useEffect, useState } from 'react';
import { 
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
 } from '@mui/material';

const BookFormDialog = ({ open, onClose, onSave, book }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        if(book) {
            setTitle(book.title);
            setAuthor(book.author);
            setDescription(book.description);
            setPrice(book.price);
        } else {
            setTitle("");
            setAuthor("");
            setDescription("");
            setPrice("");
        }
    }, [book]);

    const handleSave = () => {
        onSave({ title, author, description, price });
    }

    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{ book ? "Edit Book" : "Add Book" }</DialogTitle>
            <DialogContent>
                <TextField
                  label = 'Title'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={title}
                  onChange={(e) => {setTitle(e.target.value)}}
                />
                <TextField
                  label = 'Author'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={author}
                  onChange={(e) => {setAuthor(e.target.value)}}
                />
                <TextField
                  label = 'Price'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={price}
                  onChange={(e) => {setPrice(e.target.value)}}
                />
                <TextField
                  label = 'Description'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  multiline
                  rows={5}
                  value={description}
                  onChange={(e) => {setDescription(e.target.value)}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='error'>
                Cancel
                </Button>
                <Button onClick={handleSave} color='primary'>
                Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default BookFormDialog;