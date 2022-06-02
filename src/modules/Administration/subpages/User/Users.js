import React, { useState, useEffect } from 'react'
import { Typography, makeStyles, Grid, Paper, Box, Button } from '@material-ui/core';
import { Routes, Route, useNavigate, } from "react-router-dom";
import { connect } from 'react-redux';
import { getAllUsers, updateUser } from '../../../../redux/User/UserActions';
import { ActionColumnFormatter } from '../../../../utility/actionFormatters';
import PaginatedTable from '../../../../components/PaginatedTable';
import UserEditDialog from './UserEditDialog';
import DeleteModal from '../../modals/DeleteModal';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "auto",
        backgroundColor: theme.palette.primary.dark,
        boxSizing: "border-box",
        position: "relative"
    },
    container: {
        backgroundColor: "transparent",
        // margin:"64px 12px",
        height: "100%",
        color: "#fff",
        padding: theme.spacing(2)
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "10px 0px"
    }
}))

const Users = ({ users, totalCount, getAllUsers, userRole }) => {

    const navigate = useNavigate();
    const classes = useStyles();

    const [view, setView] = useState(false)
    const [open, setOpen] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    const onClose = () => {
        setOpen(false)
        setView(false)
        navigate(`/main/admin/users`)
    }
    const handleDeleteClose = () => setShowDelete(false)
    const handleDeleteOpen = () => setShowDelete(true)
    const handleViewOnly = (id) => {
        setView(true)
        UserUiEvents.editUserClick(id)
    }

    const UserUiEvents = {
        addNewUserClick: () => {
            navigate(`/main/admin/users/new`)
            setOpen(true)
        },
        editUserClick: (id) => {
            navigate(`/main/admin/users/${id}/edit`) //id is the specific record id from api send when click on edit btn
            setOpen(true)
        }
    }

    const columns = [
        { id: '_id', label: 'Id', align: "center" },
        { id: 'firstName', label: 'First Name', align: "center" },
        { id: 'lastName', label: 'last Name', align: 'center' },
        { id: 'role', label: 'Role', align: 'center' },
        { id: 'username', label: 'User Name', align: 'center' },
        { id: 'email', label: 'Email', align: 'center' },
        { id: 'phone', label: 'Phone Number', align: 'center' },
        { id: 'isActive', label: 'Status', align: 'center', format: (value) => <div>{value.isActive ? "Active" : "In-Active"}</div> },
        { id: "action", label: "Action", align: "center", format: (value) => <ActionColumnFormatter value={value} onEdit={UserUiEvents.editUserClick} onClickView={handleViewOnly} /> },
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={0} className={classes.container}>
                    <Box className={classes.header}>
                        <Typography variant='h3'>
                            Users
                        </Typography>
                        {/* {userRole.type === "SUPER_ADMIN" && <Button variant="outlined" color="secondary" onClick={() => UserUiEvents.addNewUserClick()}>
                            Add new
                        </Button>
                        } */}
                    </Box>
                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={users}
                        fetchData={getAllUsers}
                    />
                    <Routes>
                        <Route path="new" element={<UserEditDialog show={open} onClose={onClose} />} />
                        <Route path=":id/edit" element={<UserEditDialog show={open} onClose={onClose} view={view} />} />
                    </Routes>
                    <DeleteModal
                        show={showDelete}
                        handleClose={handleDeleteClose}
                        entityName={"User"}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    users: state.users.users,
    totalCount: state.users.totalCount,
    userRole: state.auth.userRole
})
const actions = {
    getAllUsers,
    updateUser
}
export default connect(mapStateToProps, actions)(Users)
