import React, { useEffect, useState } from 'react';
import { 
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    MenuItem,
    Box,
 } from '@mui/material';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const OrderFormDialog = ({ open, onClose, onSave, order }) => {
    const [user, setUser] = useState("");
    const [status, setStatus] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    const handleDateChange = (date) => {
        // Ensure date is a valid Date object
        if (date instanceof Date && !isNaN(date.getTime())) {
            setSelectedDate(date);
        }
    };
  
    const currencies = [
        { value: 'Ordered', label: 'Ordered' },
        { value: 'Shipped', label: 'Shipped' },
        { value: 'Delivered', label: 'Delivered' },
        { value: 'Cancelled', label: 'Cancelled' },
    ];

    useEffect(() => {
        if (order) {
            setUser(order.username || "");
            // Convert orderDate to a Date object if it's not already
            setSelectedDate(order.orderDate instanceof Date ? order.orderDate : new Date(order.orderDate));
            setStatus(order.status || "");
            setTotalAmount(order.totalAmount || "");
        } else {
            setUser("");
            setSelectedDate(new Date()); // Reset to current date
            setStatus("");
            setTotalAmount("");
        }
    }, [order]);

    const handleSave = () => {
        const updateOrder = {
            ...order,
            status: status,
            orderDate: selectedDate.toISOString(), // Date object should be fine here
        };
        onSave(updateOrder);
        if (!open) {
            setUser("");
            setSelectedDate(new Date()); // Reset to current date
            setStatus("");
            setTotalAmount("");
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            PaperProps={{
                style: {
                    width: '700px',
                    maxWidth: '90%',
                    overflow: 'visible',
                },
            }}>
            <DialogTitle>{order ? "Edit Book" : "Add Book"}</DialogTitle>
            <DialogContent>
                <Box mb={2}>
                    <TextField
                        label='User'
                        fullWidth
                        margin='normal'
                        variant='filled'
                        value={user}
                        InputProps={{ readOnly: true }}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Status"
                        margin='normal'
                        fullWidth
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box mb={2}>
                    <TextField
                        label='Total Amount'
                        fullWidth
                        margin='normal'
                        variant='filled'
                        value={totalAmount}
                        InputProps={{ readOnly: true }}
                    />
                </Box>
                <Box mb={2}>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        showTimeSelect
                        dateFormat="Pp"
                        customInput={<TextField label='Date' fullWidth margin='normal' />}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        // Revert to original order values
                        setUser(order.username || "");
                        setSelectedDate(order.orderDate instanceof Date ? order.orderDate : new Date(order.orderDate));
                        setStatus(order.status || "");
                        setTotalAmount(order.totalAmount || "");
                        onClose();
                    }}
                    color='error'
                >
                    Cancel
                </Button>
                <Button onClick={handleSave} color='primary'>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default OrderFormDialog;
