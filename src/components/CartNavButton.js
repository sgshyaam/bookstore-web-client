import React from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

import { Button } from "@mui/material";

const CartNavButton = () => {
    const linkStyle = {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      };

    return(
        <Button>
            <Link to='/cart' style={linkStyle}>
                <ShoppingCartIcon color='primary' />
            </Link>
        </Button>

    );

}

export default CartNavButton;