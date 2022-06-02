import React, { useEffect } from 'react';
import { isTablet, isMobile } from "react-device-detect";
import {
    makeStyles,
    Drawer,
    Typography,
    Divider,
    Box,
    IconButton
} from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons"
import { AdministrationLinks } from './sidebarLinks';
import DrawerItem from './DrawerItem';

const useStyles = makeStyles((theme) => ({
    root: {
        // width:'inherit',
        width:"240px",
        backgroundColor: theme.palette.primary.light,
        color:theme.palette.secondary.main,
        "& .MuiListItemIcon-root": {
            minWidth: "28px"
        },
        overflowY: "auto",
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
            width: 6,
        },
        "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.08)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.08)",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.2)",
        },
        "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(0,0,0,.4)",
        },
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0px 18px",
    },
    sublink: {
        paddingLeft: 40,
        cursor: "pointer"
    }
}))

const drawerWidth = 240;

const SideDrawer = ({ open, closeDrawer }) => {
    const classes = useStyles()
    return (
        <Box style={{ width: (isTablet || isMobile || !open) ? 0 : drawerWidth }}>
            <Drawer
                style={{ width: (isTablet || isMobile || !open) ? 0 : drawerWidth }}
                variant="persistent"
                anchor='left'
                open={open}
                classes={{ paper: classes.root }}
            >
                <Box className={classes.drawerHeader}>
                    <Typography variant="h4">Oware</Typography>
                    <IconButton onClick={closeDrawer}>
                        <ChevronLeft fontSize="small" sx={{color:"secondary.main"}} />
                    </IconButton>
                </Box>
                <Divider />
                {[AdministrationLinks].map((module) => (
                    <>
                        <Divider/>
                        <DrawerItem
                            icon={module.icon}
                            label={module.label}
                            subLinks={module.sublinks}
                        />
                    </>
                ))}
            </Drawer>
        </Box>
    )
}

export default SideDrawer;