import React, { useState } from 'react'
import { AppBar, Box, Toolbar, IconButton, makeStyles, Typography, Button } from '@material-ui/core';
import { MenuOutlined } from "@material-ui/icons"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signout } from "../redux/Auth/AuthActions";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.light,//main
        padding: "0px 12px",
        border: 0,
        minWidth: "100vw",
        height: "10vh"
    },
    flex: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    navButton: {
        margin: "0 1em"
    }
}));

const Navbar = ({ open, showDrawer }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handlelogout = () => {
        dispatch(signout())
        navigate("/")
    }
    const { userData } = useSelector((state) => ({
        userData: state.auth.userData
    }))

    return (
        <AppBar position="static" className={classes.root} sx={{ zIndex: (theme) => theme.zIndex.drawer - 1 }}>
            <Toolbar className={classes.flex}>
                <IconButton
                    edge="start"
                    aria-label="menu"
                    onClick={showDrawer}
                >
                    <MenuOutlined fontSize="medium"
                        style={{ color: "#4f4f4f" }}
                    />
                </IconButton>

                <Box sx={{ flexGrow: 0 }}>
                    <Box className={classes.flex}>
                        <Typography variant='h5'>Welcome, {userData.firstName} {userData.lastName}</Typography>
                        <Button variant='text' color="secondary" className={classes.navButton} onClick={handlelogout}>
                            Logout
                        </Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;