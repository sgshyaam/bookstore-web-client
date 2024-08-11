import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const formattedDate = new Date(order.orderDate).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
});

  return (
    <Card key={order._id}>
      <CardContent>
        <Typography variant="h6">Order ID: {order._id}</Typography>
        <Typography variant="body1">
          Total Amount: ₹{order.totalAmount}
        </Typography>
        <Typography variant="body2">Status: {order.status}</Typography>
        <Typography variant="body2">Ordered by: {order.username}</Typography>
        <Typography variant="body2">Order Date: {formattedDate}</Typography>
      </CardContent>
      <CardActions style={{ width: "90%", justifyContent: "right" }}>
        <Button
          onClick={() => {
            return navigate(`/orders/${order._id}`);
          }}
          size="small"
          variant="contained"
          color="primary"
        >
          View Details
        </Button>
        <Button size='small' color='secondary' onClick={() => onEdit(order._id)}>
            Edit
        </Button>
        <Button size='small' color='error' onClick={() => onDelete(order._id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default OrderCard;
