import React, { useState } from 'react';
import { Dialog, DialogTitle, makeStyles, DialogContentText, Typography, DialogContent, DialogActions, Button } from '@material-ui/core';
import Loader from '../../../components/Loader';

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiDialog-paper": {
            backgroundColor: "#e6e6e6",
        },
    },
    formTitle: {
        borderBottom: "1px solid rgba(0,0,0,0.5)"
    },
    deleteText:{
        color:theme.palette.secondary.main
    }
}))

const DeleteModal = ({ show, handleClose, entityName, deleteAction }) => {
    const classes = useStyles()
    const [loading, setLoading] = useState(false)

    const handleDeleteRecord = () => {
        setLoading(true)
        deleteAction().then((res) => {
            setLoading(false)
            handleClose()
        }).catch((err) => setLoading(false))
    }

    return (
        <Dialog open={show} onClose={handleClose} className={classes.root}>
            {loading && <Loader />}
            <DialogTitle className={classes.formTitle}>
                <Typography variant='h4'>
                    Delete {entityName}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText className={classes.deleteText}>
                    Are you sure you want to delete this record ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained" color="primary">Cancel</Button>
                <Button onClick={handleDeleteRecord} variant="contained" color="primary">Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteModal;
