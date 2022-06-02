import React from 'react';
import { Box, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    loaderBox: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:10,
        backgroundColor:`rgba(255,255,255,0.1)`
    }
}))

const Loader = () => {
    const classes=useStyles();
    return (
        <Box className={classes.loaderBox}>
            <CircularProgress
                color='secondary'
                disableShrink
                size="3rem"
                thickness={3.5}
                variant="indeterminate"
            />
        </Box>
  );
};

export default Loader;
