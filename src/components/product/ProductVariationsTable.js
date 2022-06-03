import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProductItemImage } from '../../redux/ProductUpload/ProductUploadActions';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ImageUpload from "./ImageUpload";
import ProductItem from './productItem';
import { createTableInitialValues } from '../../utility/productVariations';

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(1),
        overflowX: "auto",
        color: theme.palette.secondary.main,
        "& .MuiTableCell-root": {
            padding: "8px"
        }
    },
    tableHeaderCell: {
        color: theme.palette.secondary.main,
        textTransform: "capitalize",
        fontSize: "16px"
    },
}));

const ProductVariationsTable = ({ productVariations, rows, setRows, setFieldValue, rowErrors, changeRowErrors,variableProduct }) => {
    const classes = useStyles();
    const { productId } = useParams()
    const [show, setShow] = useState(false)
    const [productItemImage, setProductItemImage] = useState()

    // const createInitData = (options, rowObject) => {
    //     options.forEach((vart, ix) => {
    //         rowObject[`var${ix + 1}`] = vart
    //     })
    //     return { ...rowObject }
    // };

    // const getRowObject = (variations) => {
    //     var rowObj = null
    //     const rowInitData = { img: "", preview: "", quantity: 0, productSku: "", warehouseId: "" }
    //     rowObj = rows?.find(row => {
    //         return variations.length === 1 ?
    //             variations[0]?.id === row['var1']?.id && !row["var2"]?.id :
    //             ((variations[0]?.id === row['var1']?.id && variations[1].id === row['var2']?.id)
    //                 || (variations[0]?.id === row['var2']?.id && variations[1].id === row['var1']?.id))
    //     })
    //     return rowObj ? rowObj : rowInitData
    // }

    // const createTableInitialValues = () => {
    //     const rowElements = []
    //     if (productVariations.length === 1) {
    //         console.log("single")
    //         const variation1Options = productVariations[0]?.options
    //         for (let i = 0; i < variation1Options?.length; i++) {
    //             const rowVariations = [variation1Options[i]]
    //             const variationCopyRows = rows?.filter(row => row.var1.id === variation1Options[i].id)
    //             console.log("check1 ->", variationCopyRows)
    //             if (variationCopyRows.length) {
    //                 console.log("if")
    //                 for (let j = 0; j < variationCopyRows?.length; j++) {
    //                     const rowObject = variationCopyRows[j]
    //                     // const rowObject = getRowObject(rowVariations)
    //                     rowElements.push(createInitData(rowVariations, rowObject))
    //                 }
    //             } else {
    //                 console.log("else")
    //                 // const rowObject = getRowObject(rowVariations)
    //                 const rowObject = { img: "", preview: "", quantity: 0, productSku: "", warehouseId: "" }
    //                 rowElements.push(createInitData(rowVariations, rowObject))
    //             }
    //         }
    //     } else {
    //         const variation1Options = productVariations[0]?.options //[sm,medium]
    //         const variation2Options = productVariations[1]?.options //[blue,gray]
    //         for (let i = 0; i < variation1Options?.length; i++) {
    //             for (let j = 0; j < variation2Options?.length; j++) {
    //                 const rowVariations = [variation1Options[i], variation2Options[j]] //[sm,blue]
    //                 const variationCopyRows = rows?.filter(row => {
    //                     return ((row.var1.id === variation1Options[i].id && row.var2.id === variation2Options[j].id) ||
    //                         (row.var1.id === variation2Options[j].id && row.var2.id === variation1Options[i].id))
    //                 })
    //                 console.log("check2 ->", variationCopyRows)
    //                 if (variationCopyRows.length) {
    //                     console.log("if")
    //                     for (let j = 0; j < variationCopyRows?.length; j++) {
    //                         const rowObject = variationCopyRows[j]
    //                         // const rowObject = getRowObject(rowVariations)
    //                         rowElements.push(createInitData(rowVariations, rowObject))
    //                     }
    //                 } else {
    //                     console.log("else")
    //                     // const rowObject = getRowObject(rowVariations)
    //                     const rowObject = { img: "", preview: "", quantity: 0, productSku: "", warehouseId: "" }
    //                     rowElements.push(createInitData(rowVariations, rowObject))
    //                 }
    //             }
    //         }
    //     }
    //     return rowElements
    // }

    const toggleShow = () => setShow(!show)

    useEffect(() => { 
        if (productVariations.length >= 1) {
            console.log("debug3",productVariations.every(variation=>variation.name===""&&variation.variationTypeId===""))
            if(productVariations.every(variation=>variation.name===""&&variation.variationTypeId==="")){
                return
            }else {
                if (!productId || !variableProduct) {
                    //create rows
                    console.log("debug4")
                    setFieldValue("isvariableProduct", true)
                    const rowsInitialData = createTableInitialValues(productVariations,rows)
                    setRows([...rowsInitialData])
                } else if (productId) {
                    //edit rows
                    console.log('debug5 ->')
                    setFieldValue("isvariableProduct", true)
                    const rowsInitialData = createTableInitialValues(productVariations,rows)
                    setRows([...rowsInitialData])
                }
            }
        }
    }, [productVariations, productId])

    return (
        <div>
            <Table className={classes.root}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeaderCell} align="left">Image</TableCell>
                        <TableCell className={classes.tableHeaderCell} align="left">{productVariations[0]?.name}</TableCell>
                        {productVariations.length > 1 &&
                            <TableCell className={classes.tableHeaderCell} align="left">{productVariations[1]?.name}</TableCell>}
                        <TableCell className={classes.tableHeaderCell} align="left">Quantity</TableCell>
                        <TableCell className={classes.tableHeaderCell} align="left">SKU</TableCell>
                        <TableCell className={classes.tableHeaderCell} align="left">Warehouse</TableCell>
                        <TableCell className={classes.tableHeaderCell} align="left">{" "}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.length >= 1 && rows?.map((row, index) => (
                        <ProductItem
                            {...{ rows, setRows, index, toggleShow, setProductItemImage, row, rowErrors, changeRowErrors }}
                        />
                    ))}
                </TableBody>
            </Table>
            <ImageUpload
                show={show}
                handleClose={toggleShow}
                rows={rows}
                setRows={setRows}
                targetItem={productItemImage}
            />
        </div>
    )
}
const mapStateToProps = (state) => ({
    productVariations: state.storeVariations.productVariations,
})
const actions = {
    getProductItemImage
}
export default connect(mapStateToProps, actions)(ProductVariationsTable)