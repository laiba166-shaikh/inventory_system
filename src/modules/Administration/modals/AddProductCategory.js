import React, { useState, useEffect } from 'react'
import { TextInput } from '../../../controls';
import { DialogContent, DialogActions,Button, Grid, FormControlLabel, Checkbox } from "@material-ui/core"
import { Formik, Form } from 'formik';
import { useSelector } from 'react-redux'
import * as yup from "yup";
import Loader from '../../../components/Loader';

// const useStyles = makeStyles((theme) => ({
//     addbutton: {
//         arginTop: "12px",
//         background: theme.palette.secondary.main,
//         fontSize: "10px",
//         margin: "6px 0",
//         color: "#fff"
//     }
// }))

const validationSchema = yup.object({
    name: yup
        .string()
        .min(3, 'Product Category name should be greater than equal to 3 characters')
        .required('Product Category Name is required'),
});


const AddProductCategory = ({ initialValues, onClose, id, loading, onSave }) => {
    const [status, setStatus] = useState(false)

    useEffect(() => {
        if (id) {
            setStatus(initialValues.isActive)
        }
    }, [initialValues, id])

    const { existingCategories } = useSelector(state => ({
        existingCategories: state.categories.category.length,
    }))

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values) => {
                console.log("values -> ", values)
                if (!id) {
                    //create
                    onSave({...values,internalId: `PC-${existingCategories}`})
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
                                        label="Product Category Name"
                                        name="name"
                                        id="productCategoryName"
                                        fullWidth={true}
                                        type="text"
                                        placeholder="Product Category name"
                                    />
                                </Grid>
                                {
                                    id && <Grid item md={12} sm={12}>
                                        <FormControlLabel
                                            label="Active"
                                            sx={{color:"secondary.main"}}
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

export default AddProductCategory;
