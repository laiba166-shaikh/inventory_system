import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import { getAllCategory } from "../../../../redux/Category/CategoryActions";
import { getVariationType, createVariationType, updateVariationType } from '../../../../redux/variationType/variatonTypeActions';
import AddVariationType from '../../modals/AddVariationType';


const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiDialog-paper": {
            width:"400px",
            backgroundColor: theme.palette.primary.light,
            color:theme.palette.secondary.main
        },
    },
    formTitle: {
        borderBottom: "1px solid #4f4f4f",
        color:theme.palette.secondary.main
    }
}))
const VariationTypeEditDialog = ({ show, onClose }) => {

    let params = useParams();

    const classes = useStyles()
    const dispatch = useDispatch()

    const initialValues = {
        name: "",
        categoryId: "",
    }

    const [variationType, setVariatonType] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dispatch(getAllCategory("", ""))
        if (params.id) {
            setLoading(true)
            dispatch(getVariationType(params.id)).then((res) => {
                setVariatonType({ ...res })
                setLoading(false)
            }).catch((err) => {
                console.log("variation type did not fetch")
                setLoading(false)
            })
        }
    }, [dispatch])
    
    //save Variation Type function if(id) { edit }else { create }  
    const saveVariationType = (variationType) => {
        console.log("variationType ->", variationType)
        if (params.id) {
            setLoading(true)
            dispatch(updateVariationType(variationType)).then((res) => {
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error updating variation type")
                setLoading(false)
            })
        } else {
            setLoading(true)
            dispatch(createVariationType(variationType)).then((res) => {
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error creating variation type")
                setLoading(false)
            })
        }
    }

    return (
        <Dialog open={show} onClose={onClose} maxWidth="sm" className={classes.root}>
            <DialogTitle className={classes.formTitle}>
                <Typography variant='h4'>
                    {params.id ? "Edit" : "Add"} Variation Type
                </Typography>
            </DialogTitle>
            <AddVariationType
                initialValues={variationType || initialValues}
                onClose={onClose}
                id={params.id}
                loading={loading}
                onSave={saveVariationType}
            />
        </Dialog>
    )
}

export default VariationTypeEditDialog;
