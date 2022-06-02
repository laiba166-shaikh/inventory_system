import React, { useState, useEffect } from 'react'
import { TextInput } from '../../../controls';
import { DialogContent, DialogActions, Button, Grid, FormControlLabel, Checkbox, Typography } from "@material-ui/core"
import { Formik, Form } from 'formik';
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import * as yup from "yup";

const validationSchema = yup.object({
    name: yup
        .string()
        .min(3, 'warehouse name should be greater than equal to 3 characters')
        .required('warehouse Name is required'),
    address: yup
        .string()
        .min(3, 'Address should be greater than equal to 3 characters')
        .required('Address is required'),
    city: yup
        .string()
        .min(3, 'city name should be gretaer than equal to 3 characters')
        .required(),
});


const AddWarehouse = ({ initialValues, onClose, id, loading, onSave, readOnly }) => {

    const [status, setStatus] = useState(false)

    useEffect(() => {
        if (id) {
            setStatus(initialValues.isActive)
        }
    }, [initialValues])

    const {existingWarehouse} = useSelector(state=>({
        existingWarehouse:state.warehouses.warehouses.length
    }))
    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log("values -> ", values)
                if (!id) {
                    onSave({...values,internalId:`WH-${existingWarehouse}`})
                } else {
                    const formValues = { ...values, isActive: status}
                    onSave(formValues)
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
                                        label="Warehouse Name"
                                        name="name"
                                        id="warehouseName"
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        fullWidth={true}
                                        type="text"
                                        placeholder="Warehouse name"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Address"
                                        name="address"
                                        fullWidth={true}
                                        type="text"
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        id="warehouseAddress"
                                        placeholder="Warehouse Address"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="City"
                                        fullWidth={true}
                                        name="city"
                                        type="text"
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        id="city"
                                        placeholder="city"
                                    />
                                </Grid>
                                {
                                    (id && !readOnly) && <Grid item md={12} sm={12}>
                                        <FormControlLabel
                                            label="Active"
                                            sx={{ color:'secondary.main'}}
                                            control={
                                                <Checkbox
                                                    checked={status}
                                                    size="small"
                                                    color="secondary"
                                                    onChange={(ev) => {
                                                        setStatus(ev.target.checked)
                                                    }}
                                                />
                                            }
                                        />
                                    </Grid>
                                }
                                {
                                    readOnly && <Typography variant='body1' sx={{ color:'secondary.main', margin: "4px" }}>
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

export default AddWarehouse;
