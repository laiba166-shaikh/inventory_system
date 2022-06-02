import React, { useState } from 'react'
import { Grid, makeStyles, Box, CssBaseline } from '@material-ui/core'
import Navbar from '../components/Navbar';
import SideDrawer from '../components/SideDrawer/SideDrawer';
import { Outlet } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.light,
        boxSizing: "border-box",
        height: "100vh",
        width: "100%",
        // overflowX: "hidden",
    },
}))

const MainLayout = () => {
    const classes = useStyles()

    const [isOpen, setIsOpen] = useState(true);

    const handleDrawerOpen = () => {
        setIsOpen(true);
    };

    const handleDrawerClose = () => {
        setIsOpen(false);
    };

    return (
        <div className={classes.root}>
            {/* <CssBaseline /> */}
            <Navbar open={isOpen} showDrawer={handleDrawerOpen} />
            <div style={{ display: "flex", minHeight: "90vh" }}>
                <SideDrawer open={isOpen} closeDrawer={handleDrawerClose} />
                <Grid container >
                    <Outlet />
                </Grid>
            </div>

        </div>
    )
};

export default MainLayout;
