import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Dialog, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import AddUser from '../../modals/AddUser';
import { getUser, updateUser } from '../../../../redux/User/UserActions';
import { createUser } from '../../../../redux/Auth/AuthActions';

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
const UserEditDialog = ({ show, onClose, view=false }) => {

    let params = useParams();
    const classes = useStyles()
    const dispatch = useDispatch()

    const initUser = {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        roleId: "",
        email: "",
        phone: "",
    }

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    //destructure redux state which is required
    //call fetchSingleRecord for data as initialValues
    useEffect(() => {
        if (params.id) {
            setLoading(true)
            dispatch(getUser(params.id)).then((res) => {
                setUser({...res})
                setLoading(false)
            }).catch((err) => {
                console.log("user did not fetch")
                setLoading(false)
            })
        }
    }, [dispatch])

    //save Employee function if(id) { edit }else { create }  
    const saveUser = (user) => {
        if (params.id) {
            setLoading(true)
            dispatch(updateUser(user)).then((res) => {
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error updating user")
                setLoading(false)
            })
        }else {
            setLoading(true)
            dispatch(createUser(user)).then((res)=>{
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error creating user")
                setLoading(false)
            })
        }
    }

    return (
        <Dialog open={show} onClose={onClose} maxWidth="sm" className={classes.root}>
            <DialogTitle className={classes.formTitle}>
                <Typography variant='h4' style={{ color: "#fff" }}>
                    {params.id ? view ? "View" : "Edit" : "Add"} User
                </Typography>
            </DialogTitle>
            <AddUser
                user={(params.id && user._id) ? user : initUser}
                onClose={onClose}
                loading={loading}
                id={params.id}
                onSave={saveUser}
                readOnly={view}
            />
        </Dialog>
    )
}

export default UserEditDialog
