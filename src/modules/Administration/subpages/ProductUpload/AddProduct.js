import React, { useState, useEffect } from 'react'
import { makeStyles, Grid, MenuItem, Box, Typography, Button } from '@material-ui/core';
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { TextInput, Select } from '../../../../controls';
import { getAllCategory } from '../../../../redux/Category/CategoryActions';
import { getAllWarehouses } from '../../../../redux/Warehouse/WarehouseActions';
import { setProductVariations } from '../../../../redux/ProductVariations/productVariationsActions';
import { getAllVariationType } from '../../../../redux/variationType/variatonTypeActions';
import { createProduct, updateProduct, getProduct } from '../../../../redux/ProductUpload/ProductUploadActions';
import PageHeader from "../../../../components/PageHeader";
import ProductVariationsModal from '../../modals/ProductVariationsModal';
import ProductVariationsTable from '../../../../components/product/ProductVariationsTable';
import Loader from '../../../../components/Loader';
import { modelProductReqBody, modelProductVariationsFromResponse, validErrors } from '../../../../utility/productVariations';

const validationSchema = yup.object({
    name: yup.string()
        .min(3, 'Product name should be greater than equal to 3 characters')
        .required('Product Name is required'),
    description: yup.string()
        .min(3, 'Description should be greater than equal to 3 characters')
        .required('Product Description is required'),
    categoryId: yup.string().required("Prodcut must have a category"),
    isvariableProduct: yup.boolean(),
    masterSku: yup.string().required("product Sku is required"),
    quantity: yup.number().when("isvariableProduct", {
        is: false,
        then: yup.number().required("quantity is required")
    }),
    upc: yup.string(),
    warehouseId: yup.string().when("isvariableProduct", {
        is: false,
        then: yup.string().required("Warehouse is required")
    }),
    // productVariationDetail: yup.array().of(
    //     yup.object({
    //         productSku: yup.string().required("product Sku is required"),
    //         warehouseId: yup.string().required("Warehouse is required"),
    //         quantity: yup.number().when("isvariableProduct", {
    //             is: true,
    //             then: yup.number().required("quantity is required")
    //         })
    //     })
    // )
    //     .when("isvariableProduct", {
    //         is: true,
    //         then: yup.array().required("variable product must have variation detail item")
    //     })
});

const initialValues = {
    name: "",
    description: "",
    categoryId: "",
    masterSku: "",
    quantity: 0,
    upc: "",
    warehouseId: "",
    isvariableProduct: false,
    // productVariationDetail: []
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        overflowX: "auto",
        // overflowY: "auto",
        backgroundColor: theme.palette.primary.light,
        boxSizing: "border-box",
        color: theme.palette.secondary.main,
        padding: theme.spacing(2),
        "& .MuiFormControl-marginNormal": {
            marginTop: "0px",
            marginBottom: "8px",
        }
    },
    isAddVariationRow: {
        display: "flex",
        marginTop: "5px",
        marginBottom: "10px",
        alignItems: "center",
        "& button": {
            marginLeft: "30px"
        }

    }
}))

const AddProduct = ({
    categories,
    warehouses,
    variationTypesRes,
    getAllCategory,
    getAllWarehouses,
    getAllVariationType,
    setProductVariations,
    productVariations,
    userId,
    createProduct,
    getProduct,
    updateProduct
}) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const { productId } = useParams()

    const [isVariationExist, setIsVariationExist] = useState(false)
    const [editVariations, setEditVariations] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formValues, setFormValues] = useState(initialValues)
    const [productVariationDetail, setProductVariationDetail] = useState([])
    const [rowErrors, setRowErrors] = useState([])
    const [productVarResponse, setProductVarResponse] = useState([])
    const [responseItems,setResponseItems] = useState([])

    const handleGoPrevPage = () => {
        navigate("/main/admin/product")
        setProductVariations([])
    }
    const handleIsAddVariation = () => {
        // productVariations.length >= 1 ? setEditVariations(true) : setIsVariationExist(true)
        setEditVariations(true)
    }
    const handleVariationCancel = () => {
        // productVariations.length >= 1 ? setEditVariations(false) : setIsVariationExist(false)
        setEditVariations(false)
    }
    const handleGetCategoryVarTypes = (categoryId) => {
        getAllVariationType("", "", categoryId)
    }

    useEffect(() => {
        getAllCategory("", "")
        getAllWarehouses("", "")
        return () => {
            console.log('add return')
            setProductVariationDetail([])
            setProductVariations([])
        }
    }, [])

    useEffect(() => {
        if (productId) {
            setLoading(true)
            getProduct(productId).then((productRes) => {
                if (productRes.status === "success") {
                    const { categoryId, ...prevData } = productRes.product
                    if (prevData.isvariableProduct) {
                        const productVarDetail = prevData.productVariationDetail
                        setProductVariationDetail([...productVarDetail])
                        setResponseItems([...productVarDetail])
                        setProductVarResponse([...prevData.productVariations])
                    }
                    setFormValues({ categoryId: categoryId._id, ...prevData })
                    handleGetCategoryVarTypes(categoryId._id)
                }
                setLoading(false)
            }).then(err => setLoading(false))
        }
    }, [productId])

    useEffect(() => {
        console.log("debug1 ->",productVariations)
        if (productVariations.every(variation => variation.name === "" && variation.variationTypeId === "")) {
            console.log('debug2')
            setProductVariationDetail([])
            return
        }
    }, [productVariations])

    useEffect(() => {
        if (productVarResponse.length >= 1 && variationTypesRes.length >= 1) {
            var variations = modelProductVariationsFromResponse(productVarResponse, variationTypesRes)
            setProductVariations([...variations])
        }
    }, [productVarResponse, variationTypesRes,setProductVariations])

    useEffect(() => {
        console.log('rows ->', productVariationDetail)
    }, [productVariationDetail])

    return (
        <Grid item className={classes.root} md={12} xs={12} style={{ position: "relative" }}>
            {loading && <Loader />}
            <PageHeader
                title={productId ? 'Edit Product' : 'Add new Product'}
                buttonTitle="Cancel"
                headerAction={handleGoPrevPage}
            />
            <Formik
                initialValues={formValues}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    var submitValues = { ...values, productVariationDetail }
                    if (values.isvariableProduct) {
                        const { errorMessages, isNoError } = validErrors(productVariationDetail)
                        setRowErrors([...errorMessages])
                        if (!isNoError) return
                    }
                    if (!productId) {
                        const productReqBody = modelProductReqBody(submitValues, productVariations, userId, [])
                        console.log("create body ->", productReqBody)
                        setLoading(true)
                        createProduct(productReqBody).then((res) => {
                            console.log("productRes ->", res)
                            setLoading(false)
                            handleGoPrevPage()
                        }).catch(err => {
                            console.log("product err ->", err)
                            setLoading(false)
                        })
                    } else {
                        const productReqBody = modelProductReqBody(submitValues, productVariations, userId, productVarResponse)
                        console.log("update body ->", productReqBody)
                        setLoading(true)
                        updateProduct(productReqBody,responseItems).then((res) => {
                            console.log("edit productRes ->", res)
                            setLoading(false)
                            handleGoPrevPage()
                        }).catch(err => {
                            console.log("product err ->", err)
                            setLoading(false)
                        })
                    }
                }}
            >
                {({ handleSubmit, errors, values, touched, setFieldValue }) => (
                    <>
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Select
                                        label="Select Category"
                                        fullWidth={true}
                                        name="categoryId"
                                        disabled={productId ? true : false}
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(e) => {
                                            setFieldValue("categoryId", e.target.value)
                                            handleGetCategoryVarTypes(e.target.value)
                                        }}
                                    >
                                        {categories?.map((category, i) => (
                                            <MenuItem value={category._id} key={i}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextInput
                                        label="Product Name"
                                        name="name"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        type="text"
                                        id="productName"
                                        autoComplete="off"
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextInput
                                        label="Description"
                                        name="description"
                                        type="text"
                                        fullWidth={true}
                                        multiline={true}
                                        rows={2}
                                        id="description"
                                    />
                                </Grid>
                            </Grid>
                            <Box className={classes.isAddVariationRow}>
                                <Typography variant="h5">
                                    {productVariations.length >= 1 ? "Variable Product" : "Single Product"}
                                </Typography>
                                <Button variant="contained" color="secondary" disabled={values.categoryId === ""} onClick={handleIsAddVariation}>
                                    {productVariations.length >= 1 ? "Edit Variations" : "Add Variations"}
                                </Button>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextInput
                                        label="Master SKU"
                                        name="masterSku"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        type="text"
                                        id="sku"
                                        autoComplete="off"
                                    />
                                </Grid>
                                {
                                    (productVariations?.every(variation => (variation.name === "" && variation.variationTypeId === ""))) &&
                                    <>
                                        <Grid item xs={12} md={6}>
                                            <TextInput
                                                label="UPC"
                                                fullWidth={true}
                                                name="upc"
                                                InputLabelProps={{ shrink: true }}
                                                type="text"
                                                id="upc"
                                                autoComplete="off"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextInput
                                                label="Quantity"
                                                name="quantity"
                                                fullWidth={true}
                                                InputLabelProps={{ shrink: true }}
                                                type="text"
                                                id="quantity"
                                                autoComplete="off"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Select
                                                label="Select Warehouse"
                                                fullWidth={true}
                                                name="warehouseId"
                                                InputLabelProps={{ shrink: true }}
                                            >
                                                {warehouses?.map((warehouse, i) => (
                                                    <MenuItem value={warehouse._id} key={i}>
                                                        {warehouse.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </Grid>
                                    </>
                                }
                            </Grid>
                            {
                                (!productVariations.every(variation => variation.name === "" && variation.variationTypeId === "")) &&
                                <ProductVariationsTable
                                    rows={productVariationDetail}
                                    setRows={setProductVariationDetail}
                                    setFieldValue={setFieldValue}
                                    rowErrors={rowErrors}
                                    variableProduct={values.isvariableProduct}
                                    changeRowErrors={setRowErrors}
                                />
                            }
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleSubmit} style={{ marginTop: "10px", width: "130px" }}
                                disabled={loading}
                            >
                                Save
                            </Button>
                        </Form>
                        <ProductVariationsModal
                            // show={isVariationExist || editVariations}
                            show={editVariations}
                            onClose={handleVariationCancel}
                            setFieldValue={setFieldValue}
                        />
                    </>
                )}
            </Formik>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    categories: state.categories.category,
    warehouses: state.warehouses.warehouses,
    productVariations: state.productVariations.productVariations,
    variationTypesRes: state.variationTypes.variationType,
    userId: state.auth.userData.id
})

const actions = {
    getAllCategory,
    getAllWarehouses,
    setProductVariations,
    createProduct,
    updateProduct,
    getProduct,
    getAllVariationType
}

export default connect(mapStateToProps, actions)(AddProduct)