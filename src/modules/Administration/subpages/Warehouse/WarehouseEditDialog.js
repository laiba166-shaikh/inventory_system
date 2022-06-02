import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { Dialog, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import AddWarehouse from '../../modals/AddWarehouse';
import { getWarehouse, createWarehouse, updateWarehouse } from "../../../../redux/Warehouse/WarehouseActions";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiDialog-paper": {
            backgroundColor: theme.palette.primary.light,
            color:theme.palette.secondary.main
        },
    },
    formTitle: {
        borderBottom: "1px solid #4f4f4f",
        color:theme.palette.secondary.main
    }
}))
const WarehouseEditDialog = ({ show, onClose, view = false }) => {

    let params = useParams();

    const classes = useStyles()
    const dispatch = useDispatch()

    const initialValues = {
        name: "",
        address: "",
        city: "",
    }

    const [warehouse, setWarehouse] = useState({})
    const [loading, setLoading] = useState(false)
    //destructure redux state which is required
    //call fetchSingleRecord for data as initialValues
    useEffect(() => {
        if (params.id) {
            setLoading(true)
            dispatch(getWarehouse(params.id)).then((res) => {
                setWarehouse({ ...res })
                setLoading(false)
            }).catch((err) => {
                console.log("warehouse did not fetch")
                setLoading(false)
            })
        }
    }, [dispatch])

    //save Employee function if(id) { edit }else { create }  
    const saveWarehouse = (warehouse) => {
        if (params.id) {
            setLoading(true)
            dispatch(updateWarehouse(warehouse)).then((res) => {
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error updating warehouse")
                setLoading(false)
            })
        } else {
            setLoading(true)
            dispatch(createWarehouse(warehouse)).then((res) => {
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error creating warehouse")
                setLoading(false)
            })
        }
    }

    return (
        <Dialog open={show} onClose={onClose} maxWidth="sm" className={classes.root}>
            <DialogTitle className={classes.formTitle}>
                <Typography variant='h4'>
                    {params.id ? view ? "View" : "Edit" : "Add"} Warehouse
                </Typography>
            </DialogTitle>
            <AddWarehouse
                initialValues={warehouse || initialValues}
                onClose={onClose}
                id={params.id}
                loading={loading}
                onSave={saveWarehouse}
                readOnly={view}
            />
        </Dialog>
    )
}

export default WarehouseEditDialog;
