import React, { useContext } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order, onView, onEdit, onDelete }) => {
  const { admin } = useContext(AuthContext);
  const navigate = useNavigate();

  const inlineStyle = { position: "static" };
  return (
    <Card key={order.id}>
      <CardContent>
        <Typography variant="h6">Order ID: {order._id}</Typography>
        <Typography variant="body1">
          Total Amount: ₹{order.totalAmount}
        </Typography>
        <Typography variant="body2">Status: {order.status}</Typography>
        <Typography variant="body2">Ordered by: {order.username}</Typography>
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
      </CardActions>
    </Card>
  );
};

export default OrderCard;
