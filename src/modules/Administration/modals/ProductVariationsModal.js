import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, makeStyles, Typography, Box, Divider } from '@material-ui/core';
import { connect, useDispatch, useSelector } from "react-redux"
import { getAllVariationType } from '../../../redux/variationType/variatonTypeActions';
import Loader from '../../../components/Loader';
import VariationAddForm from '../../../components/product/VariationAddForm';
import { setProductVariations } from '../../../redux/ProductVariations/productVariationsActions';
import { useParams } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        color: theme.palette.secondary.main,
        "& .MuiDialog-paper": {
            backgroundColor: theme.palette.primary.light,
        },
    },
    formTitle: {
        borderBottom: "1px solid rgba(0,0,0,0.5)"
    }
}))
const ProductVariationsModal = ({ show, onClose, setFieldValue, variationTypes, productVariations }) => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const { productId } = useParams()

    const [loading, setLoading] = useState(false)
    const [addMoreVariation, setAddMoreVariation] = useState(true)
    const [variations, setVariations] = useState([
        {
            name: "",
            variationTypeId: "",
            options: [],
        }
    ])

    const handleAddMoreVariation = () => {
        variations.push({
            name: "",
            variationTypeId: "",
            options: [],
        })
        setAddMoreVariation(false)
    }

    const handleCancelModal = () => {
        onClose()
        // setAddMoreVariation(true)
        // if(!productId){
        //     setVariations([{
        //         name: "",
        //         variationTypeId:"",
        //         options: [],
        //     }])
        //     dispatch(setProductVariations([]))
        // }
    }

    const handleSaveAndContinue = () => {
        console.log("variation SUBMIT -> ", variations)
        dispatch(setProductVariations(variations))
        onClose()
    }

    useEffect(() => {
        // setVariations([...productVariations])
        return () => {
            console.log('return')
            setVariations([{
                name: "",
                variationTypeId: "",
                options: [],
            }])
        }
    }, [])

    useEffect(() => {
        if (productVariations.length >= 1) {
            if (productVariations.every(variation => variation.name === "" && variation.variationTypeId === "")) {
                console.log('modal')
                setFieldValue("isvariableProduct", false)
                return
            }
            console.log("redux var get ->", productVariations)
            setVariations([...productVariations])
        }
    }, [productVariations, setFieldValue])

    // useEffect(() => {
    //     if (variations.length === 2) {
    //         setAddMoreVariation(false)
    //     } else {
    //         setAddMoreVariation(true)
    //     }
    // }, [variations])

    return (
        <Dialog open={show} onClose={onClose} maxWidth="md" fullWidth={true} className={classes.root}>
            {loading && <Loader />}
            <DialogTitle className={classes.formTitle}>
                <Typography variant='h4' style={{ color: "#fff" }}>
                    Add Variations
                </Typography>
            </DialogTitle>
            <DialogContent style={{ width: "100%" }}>
                {variations.map((_, index) => {
                    return <Box key={index}>
                        <VariationAddForm
                            variationTypes={variationTypes}
                            variations={variations}
                            index={index}
                            handleChangeVariation={setVariations}
                            storeVariations={productVariations}
                        />
                        {(addMoreVariation || variations.length < 2) &&
                            <>
                                <Button variant="contained" color="secondary" onClick={handleAddMoreVariation} style={{ margin: "4px 0" }}>Add Variation</Button>
                                <Divider />
                            </>
                        }
                    </Box>
                })}
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleSaveAndContinue()}>
                    Save and Continue
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCancelModal}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const mapStateToProps = (state) => ({
    variationTypes: state.variationTypes.variationType,
    productVariations: state.productVariations.productVariations,
})

export default connect(mapStateToProps)(ProductVariationsModal);
