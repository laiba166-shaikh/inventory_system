import React, { useState, useEffect } from 'react'
import { TextInput, Select } from '../../../controls';
import { useSelector } from "react-redux"
import { DialogContent, DialogActions, Button, Grid, MenuItem } from "@material-ui/core"
import { Formik, Form } from 'formik';
import * as yup from "yup";
import Loader from '../../../components/Loader';

const validationSchema = yup.object({
    name: yup
        .string()
        .min(3, 'Variation name should be greater than equal to 3 characters')
        .required('Variation Type is required'),
    categoryId: yup
        .string()
        .required("Variation Type must have a category"),
});



const AddVariationType = ({ initialValues, onClose, id, loading, onSave }) => {
    const [formValues, setFormValues] = useState(initialValues)

    const { categories,existingVariationTypes } = useSelector(state => ({
        categories: state.categories.category,
        existingVariationTypes: state.variationTypes.variationType.length
    }))

    useEffect(() => {
        if (id && categories.length>=1) {
            console.log(initialValues)
            setFormValues({
                ...initialValues,
                categoryId: initialValues.categoryId._id,
            })
        }
    }, [categories, initialValues, id])

    return (
        <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values) => {
                console.log("values -> ", values)
                if (!id) {
                    //create
                    const formValues = { ...values, internalId: `VT-${existingVariationTypes}` }
                    onSave(formValues)
                } else {
                    const formValues = { ...values}
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
                                        label="Variation Type"
                                        name="name"
                                        id="variationTypeName"
                                        fullWidth={true}
                                        type="text"
                                        placeholder="Variation Type name"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <Select
                                        label="Select Category"
                                        fullWidth={true}
                                        name="categoryId"
                                        id="categoryId"
                                        placeholder="Select Category"
                                        InputLabelProps={{ shrink: true }}
                                    >
                                        {categories?.map((category) => (
                                            <MenuItem
                                                key={category._id}
                                                value={category._id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
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

export default AddVariationType;
