import React from "react";
import { Snackbar } from "@material-ui/core";

const Prompt = ({ vertical="top", horizontal="center", open, handleClose }) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            autoHideDuration={6000}
            message="Error Message"
            style={{backgroundColor:"#d32f2f",color:"#fff"}}
            key={vertical + horizontal}
        />
    )
}

export default Prompt;