import React from 'react';
import { Typography, makeStyles, Box, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "10px 0px"
    },
    buttonCont: {
        // width:"25%",
        display: "flex",
        alignItems: "center",
        justifyContent:"flex-end",
    }
}))

const PageHeader = ({ title, buttonTitle, headerAction, clickExport}) => {
    const classes = useStyles()
    return (
        <Box className={classes.header}>
            <Typography variant='h3'>
                {title}
            </Typography>
            <Box className={classes.buttonCont}>
                {
                    clickExport && <Button variant="contained" color="secondary" onClick={clickExport} style={{margin:"0 10px"}}>
                        Export As CSV
                    </Button>
                }
                <Button variant="contained" color="secondary" onClick={headerAction}>
                    {buttonTitle}
                </Button>
            </Box>
        </Box>
    )
};

export default PageHeader;
