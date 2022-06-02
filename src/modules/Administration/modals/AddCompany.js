import React, { useState, useEffect } from 'react'
import { TextInput, } from '../../../controls';
import Loader from '../../../components/Loader';
import { DialogContent, DialogActions, Button, Grid, FormControlLabel, Checkbox, Typography } from "@material-ui/core"
import { Formik, Form } from 'formik';
import * as yup from "yup";

const validationSchema = yup.object({
    name: yup
        .string()
        .min(3, 'Company name should be greater than equal to 3 characters')
        .required('Company Name is required'),
    type: yup
        .string()
        .min(3, 'Company type should be greater than equal to 3 characters')
        .required('Comapny type is required'),
    notes: yup
        .string()
        .min(3, 'Notes should be gretaer than equal to 5 characters'),
    phone: yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Phone Number is required"),
});


const AddCompany = ({ initialValues, onClose, id, onSave, loading, readOnly }) => {

    const [status, setStatus] = useState(false)

    useEffect(() => {
        if (id) {
            setStatus(initialValues.isActive)
        }
    }, [initialValues])

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values) => {
                console.log("values -> ", values)
                if (!id) {
                    onSave(values)
                } else {
                    const formValues = { ...values, isActive: status }
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
                                        label="Company Name"
                                        name="name"
                                        id="companyName"
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        fullWidth={true}
                                        // type="text"
                                        placeholder="Company name"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Company Type"
                                        name="type"
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        fullWidth={true}
                                        // type="text"
                                        id="companyType"
                                        placeholder="CompanyType"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Notes"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        name="notes"
                                        // type="text"
                                        id="notes"
                                        placeholder="Add Notes"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Phone Number"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        name="phone"
                                        // type="text"
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

export default AddCompany;
