import React from "react";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";


const AddButton = ({ onAdd, buttonName, buttonStyle=''}) => {
    return(
        <Button onClick={onAdd} variant={buttonStyle} size='small'>
            {buttonName}
            <AddCircleIcon color='primary'/>
        </Button>
    );
}

export default AddButton;