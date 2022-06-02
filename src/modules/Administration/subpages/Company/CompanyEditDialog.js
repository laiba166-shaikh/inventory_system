import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { Dialog, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import AddCompany from '../../modals/AddCompany';
import { getCompany, createCompany, updateCompany } from "../../../../redux/Company/CompanyActions";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiDialog-paper": {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    formTitle: {
        borderBottom: "1px solid rgba(255,255,255,0.5)"
    }
}))
const CompanyEditDialog = ({ show, onClose, view = false }) => {

    let params = useParams();
    console.log("params -> ", params, params.id);

    const classes = useStyles()
    const dispatch = useDispatch()

    const initialValues = {
        name: "",
        type: "",
        notes: "",
        phone: "",
    }

    const [company, setCompany] = useState({})
    const [loading, setLoading] = useState(false)
    //destructure redux state which is required

    //call fetchSingleRecord for data as initialValues
    useEffect(() => {
        if (params.id) {
            setLoading(true)
            dispatch(getCompany(params.id)).then((res) => {
                setCompany({ ...res })
                setLoading(false)
            }).catch((err) => {
                console.log("company did not fetch")
                setLoading(false)
            })
        }
    }, [dispatch])

    //save Company function if(id) { edit }else { create }  
    const saveCompany = (company) => {
        if (params.id) {
            setLoading(true)
            dispatch(updateCompany(company)).then((res) => {
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error updating company")
                setLoading(false)
            })
        } else {
            setLoading(true)
            dispatch(createCompany(company)).then((res) => {
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error creating company")
                setLoading(false)
            })
        }
    }

    return (
        <Dialog open={show} onClose={onClose} maxWidth="sm" className={classes.root}>
            <DialogTitle className={classes.formTitle}>
                <Typography variant='h4' style={{ color: "#fff" }}>
                    {params.id ? view ? "View" : "Edit" : "Add"} Company
                </Typography>
            </DialogTitle>
            <AddCompany
                initialValues={company || initialValues}
                onClose={onClose}
                id={params.id}
                loading={loading}
                onSave={saveCompany}
                readOnly={view}
            />
        </Dialog>
    )
}

export default CompanyEditDialog;
