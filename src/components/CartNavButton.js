import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../context/CartContext";   
import Tooltip from '@mui/material/Tooltip';

import { Button } from "@mui/material";

const CartNavButton = () => {
    const linkStyle = {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      };
      const navigate = useNavigate();
      const { cart } = useContext(CartContext);

    return(
        <Tooltip title="Proceed To Cart" placement="top-end">
            <Button variant="contained" color="primary" style={linkStyle} onClick={()=> navigate('/cart')}>
                    <ShoppingCartIcon style={{ color: 'white' }}/> ({cart.length})
            </Button>
        </Tooltip>

    );

}

export default CartNavButton;