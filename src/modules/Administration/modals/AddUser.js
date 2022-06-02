import React, { useEffect, useState } from 'react'
import { MenuItem, DialogContent, DialogActions, Button, Grid, FormControlLabel, Checkbox, Typography } from "@material-ui/core"
import { Formik, Form } from 'formik';
import * as yup from "yup";
import { TextInput, Select } from '../../../controls';
import Loader from '../../../components/Loader';

const validationSchema = yup.object({
    firstName: yup
        .string()
        .min(3, 'firstName should be less than equal to 3 characters')
        .required('First Name is required'),
    lastName: yup
        .string()
        .min(3, 'lastName should be less than equal to 3 characters')
        .required('Last Name is required'),
    username: yup
        .string()
        .min(3, 'userName should be less than equal to 3 characters')
        .required('User Name is required'),
    password: yup.string().max(50, ""),
    email: yup.string()
        .email("Wrong email format")
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("email is required"),
    phone: yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Phone Number is required"),
    roleId: yup.string().required("role is required")
});


const AddUser = ({ user, onClose, id, onSave, loading, readOnly }) => {
    const [status, setStatus] = useState(false)
    const [roles, setRoles] = useState([])

    // useEffect(() => {
    //     getRoles().then((res) => {
    //         setRoles([...res.filter((role)=>role.type !== "SUPER_ADMIN")])
    //     }).catch((err) => console.log("err getting roles"))
    //     setStatus(user.isActive)
    // }, [user])

    return (
        <Formik
            initialValues={user}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values) => {
                console.log("values - >",values)
                if (id) {
                    onSave({ ...values, isActive: status })
                }else {
                    const {roleId,...newUser}=values
                    onSave({...newUser,role:roleId})
                }
            }}
        >
            {({ handleSubmit, errors, values, touched }) => (
                <>
                    {loading && <Loader />}
                    <DialogContent>
                        <Form>
                            <Grid container>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="First Name"
                                        name="firstName"
                                        id="firstName"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        // type="text"
                                        placeholder="First name"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Last Name"
                                        name="lastName"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        // type="text"
                                        id="lastName"
                                        placeholder="Last name"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="User Name"
                                        fullWidth={true}
                                        name="username"
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        // type="text"
                                        id="username"
                                        placeholder="User name"
                                    />
                                </Grid>
                                {
                                    !readOnly && <Grid item md={12} sm={12}>
                                        <TextInput
                                            label={!id ? "Password" : "Change Password"}
                                            fullWidth={true}
                                            name="password"
                                            type="password"
                                            id="password"
                                            placeholder="Password"
                                        />
                                    </Grid>
                                }
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Email"
                                        fullWidth={true}
                                        name="email"
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        // type="text"
                                        id="email"
                                        placeholder="user@gmail.com"
                                    />
                                </Grid>
                                {/* <Grid item md={12} sm={12}>
                                    <Select
                                        label="Select Role"
                                        fullWidth={true}
                                        name="roleId"
                                        id="role"
                                        disabled={readOnly ? true : false}
                                    >
                                        {roles?.map((role) => (
                                            <MenuItem value={role._id} key={role._id}>{role.name}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid> */}
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Phone Number"
                                        fullWidth={true}
                                        name="phone"
                                        InputLabelProps={{ shrink: true }}
                                        // type="text"
                                        disabled={readOnly ? true : false}
                                        id="phone"
                                        placeholder="+92 1342 122"
                                    />
                                </Grid>
                                {
                                    (id && !readOnly) && <Grid item md={12} sm={12}>
                                        <FormControlLabel
                                            label="Active"
                                            style={{ color: "rgba(255,255,255,0.5)" }}
                                            control={
                                                <Checkbox
                                                    checked={status}
                                                    size="small"
                                                    color="secondary"
                                                    onChange={(ev) => {
                                                        console.log(ev.target.checked)
                                                        setStatus(ev.target.checked)
                                                    }}
                                                />
                                            }
                                        />
                                    </Grid>
                                }
                                {
                                    readOnly && <Typography variant='body1' style={{ color: "rgba(255,255,255,0.5)", margin: "4px" }}>
                                        {status ? "Active" : "In Active"}
                                    </Typography>
                                }
                            </Grid>
                        </Form>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={onClose}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
                    </DialogActions>
                </>
            )}
        </Formik>
    )
}

export default AddUser
