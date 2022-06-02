import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    makeStyles,
    List,
    ListItemText,
    ListItemIcon,
    ListItem,
    Collapse,
} from "@material-ui/core";
import { ExpandMore, ExpandLess, ContactPhoneSharp } from "@material-ui/icons"
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    sublink: {
        paddingLeft: 40,
        cursor: "pointer"
    }
}))

const DrawerItem = ({ icon, label, subLinks }) => {
    const classes = useStyles()
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [isOpen, setIsOpen] = useState(true)
    const [activeLink, setActiveLink] = useState("")

    const { role } = useSelector((state) => ({
        role: state.auth.userRole
    }))
    const handleOpenSideLinks = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        setActiveLink(pathname.split("/")[3])
    }, [pathname])

    return (
        <List component="nav" dense={true} key={label}>
            <ListItem button>
                <ListItemIcon >
                    {icon}
                </ListItemIcon>
                <ListItemText primary={label} />
                {
                    isOpen ? <ExpandMore fontSize='small' onClick={handleOpenSideLinks} />
                        : <ExpandLess fontSize='small' onClick={handleOpenSideLinks} />
                }
            </ListItem>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding dense={true}>
                    {
                        subLinks.map((link, linkInx) => {
                            // if(link.allowed && link.allowed.includes(role.type)) {
                            return (
                                <ListItem button key={linkInx} index={link.label} className={classes.sublink} onClick={() => navigate(link.path)}>
                                    <ListItemText primary={link.label} style={{ color: link.path.includes(activeLink) ? "#4f4f4f" : "#333232" }} />
                                </ListItem>
                            )
                            // }else {
                            //     return null
                            // }   
                        })
                    }
                </List>
            </Collapse>
        </List>
    )
}

export default DrawerItem
