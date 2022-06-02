import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Dialog, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import AddProductCategory from '../../modals/AddProductCategory';
import { getCategory, createCategory, updateCategory } from "../../../../redux/Category/CategoryActions";

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
const ProductCategoryEditDialog = ({ show, onClose }) => {

    let params = useParams();
    console.log("params -> ", params, params.id);

    const classes = useStyles()
    const dispatch = useDispatch()

    const initialValues = {
        name: ""
    }

    const [category, setCategory] = useState({})
    const [loading, setLoading] = useState(false)
    //destructure redux state which is required
    //call fetchSingleRecord for data as initialValues
    useEffect(() => {
        if (params.id) {
            setLoading(true)
            dispatch(getCategory(params.id)).then((res) => {
                setCategory({ ...res })
                setLoading(false)
            }).catch((err) => {
                console.log("category did not fetch")
                setLoading(false)
            })
        }
    }, [dispatch])
    //save Category function if(id) { edit }else { create }  
    const saveCategory = (category) => {
        if (params.id) {
            setLoading(true)
            dispatch(updateCategory(category)).then((res) => {
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error updating category")
                setLoading(false)
            })
        } else {
            setLoading(true)
            dispatch(createCategory(category)).then((res) => {
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error creating category")
                setLoading(false)
            })
        }
    }

    return (
        <Dialog open={show} onClose={onClose} maxWidth="sm" className={classes.root}>
            <DialogTitle className={classes.formTitle}>
                <Typography variant='h4'>
                    {params.id ? "Edit" : "Add"} ProductCategory
                </Typography>
            </DialogTitle>
            <AddProductCategory
                initialValues={category || initialValues}
                onClose={onClose}
                id={params.id}
                loading={loading}
                onSave={saveCategory}
            />
        </Dialog>
    )
}

export default ProductCategoryEditDialog;
