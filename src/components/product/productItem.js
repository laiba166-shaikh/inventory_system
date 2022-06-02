import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { Add, Close } from "@material-ui/icons";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ProductVariationEditTableCell from './productVariationEditTableCell';
import { useParams } from 'react-router-dom';
import { getProductItemImage } from '../../redux/ProductUpload/ProductUploadActions';

const useStyles = makeStyles(theme => ({
    tableCell: {
        minWidth: "100px",
        color: theme.palette.secondary.min,
        textTransform: "capitalize"
    },
    icon: {
        fontSize: 22,
        margin: "0 3px",
        cursor: "pointer",
    },
    itemImage: {
        width: "60px",
        height: "60px",
        cursor: "pointer"
    }
}));

const ProductItem = (props) => {
    const { rows, setRows, index, toggleShow, row, setProductItemImage, rowErrors, changeRowErrors } = props
    const classes = useStyles()
    const { productId } = useParams()
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);

    const { productVariations, warehouses } = useSelector(state => ({
        productVariations: state.productVariations.productVariations,
        warehouses: state.warehouses.warehouses
    }))

    const onClickRowImgCell = () => {
        toggleShow()
        setProductItemImage(index + 1)
    }
    const onClickAddIcon = (operation) => {
        const variationTypeId = productVariations.length === 1 ? [rows[index]["var1"].optionName] : [rows[index]["var1"].optionName, rows[index]["var2"].optionName]
        if (operation === "update") {
            const updateRowObj = row.variationTypeId?.length ? { ...row, variationTypeId: variationTypeId } : { ...row }
            rows[index] = updateRowObj
            setRows([...rows])
            return
        } else if (operation === "add") {
            const existingRowCombinations = rows.filter(single => {
                return productVariations.length === 1 ?
                    single.var1.id === row.var1.id :
                    (single.var1.id === row.var1.id && single.var2.id === row.var2.id)
            })
            if (existingRowCombinations.length < warehouses.length) {
                const rowInitData = { img: "", preview: "",hasImage:false, quantity: 0, productSku: "", warehouseId: "", variationTypeId }
                const copyRowObj = { ...rowInitData, var1: rows[index]["var1"], var2: rows[index]["var2"] }
                rows.splice(index + 1, 0, copyRowObj);
                setRows([...rows])
            } else return
        }
    }
    const onClickDeleteIcon = () => {
        const existingRowCombinations = rows.filter(single => {
            return productVariations.length === 1 ?
                single.var1.id === row.var1.id :
                (single.var1.id === row.var1.id && single.var2.id === row.var2.id)
        })
        if (existingRowCombinations.length > 1) {
            rows.splice(index, 1)
            setRows([...rows])
        } else return
    }

    useEffect(() => {
        if (productVariations.length >= 1) {
            onClickAddIcon("update")
        }
    }, [productVariations])

    useEffect(() => {
        if (productId && row?.id) {
            setLoading(true)
            dispatch(getProductItemImage(row,productId)).then(res => {
                console.log("imag response ->",res)
                if(res!=='error'){
                    rows[index]["preview"] = res
                    rows[index]['hasImage'] = true
                    setRows([...rows])
                    setLoading(false)
                }else {
                    rows[index]['hasImage'] = false
                    setRows([...rows])
                    setLoading(false)
                }
            })
        }
    }, [productId])

    return (
        Object.values(row).length >= 1 ?
            <TableRow key={index} name='productVariationDetail'>
                <TableCell className={classes.tableCell} align="left" onClick={onClickRowImgCell}>
                    {
                        productId && loading ?
                            <div>Loading....</div>
                            :
                            row.preview ?
                                <img
                                    src={row.preview}
                                    alt="preview"
                                    className={classes.itemImage}
                                />
                                :
                                <u>Image</u>
                    }
                </TableCell>
                <TableCell className={classes.tableCell} align="left">{row["var1"]?.optionName}</TableCell>
                {row["var2"]?.id &&
                    <TableCell className={classes.tableCell} align="left">{row["var2"]?.optionName}</TableCell>}
                <ProductVariationEditTableCell {...{ rows, name: "quantity", rowIndex: index, handleUpdateRows: setRows, rowErrors, changeRowErrors }} />
                <ProductVariationEditTableCell {...{ rows, name: "productSku", rowIndex: index, handleUpdateRows: setRows, rowErrors, changeRowErrors }} />
                <ProductVariationEditTableCell {...{ rows, name: "warehouseId", rowIndex: index, handleUpdateRows: setRows, rowErrors, changeRowErrors, type: "select" }} />
                <TableCell className={classes.tableCell} align="left">
                    <span onClick={() => onClickAddIcon("add")}>
                        <Add style={{ color: "#4f4f4f" }} className={classes.icon} />
                    </span>
                    {/**row.copied === true */}
                    {row?.variationTypeId?.length && <span onClick={onClickDeleteIcon}>
                        <Close style={{ color: "#4f4f4f" }} className={classes.icon} />
                    </span>}

                </TableCell>
            </TableRow>
            :
            null
    )
}

export default ProductItem