import React, { useState, useEffect } from 'react';
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
    input: {
        outline: "none",
        background: "transparent",
        border: "1px solid #c1c1c1",
        height: "36px",
        color: theme.palette.secondary.main,
        padding: "0 10px",
        width: "130px",
        borderRadius: "4px"
    },
    errorText: {
        color: "#d32f2f",
        display: "block"
    }
}));

const ProductVariationEditTableCell = (props) => {
    const { rows, name, rowIndex, handleUpdateRows, rowErrors, changeRowErrors, type = "text" } = props
    const classes = useStyles();
    const [inputValue, setInputValue] = useState("")
    const [warehouseError, setWarehouseError] = useState({
        row: -1,
        error: false
    })

    const { warehouses, productVariations } = useSelector(state => ({
        warehouses: state.warehouses.warehouses,
        productVariations: state.storeVariations.productVariations,
    }))

    const checkWarehouse = (currValue) => {
        const existingRowCombinations = rows.filter(single => {
            return productVariations.length === 1 ?
                single.var1?.id === rows[rowIndex]["var1"]?.id :
                (single.var1?.id === rows[rowIndex]["var1"]?.id && single.var2?.id === rows[rowIndex]["var2"]?.id)
        })
        const isWarehouseExist = existingRowCombinations.some(comb => comb.warehouseId === currValue)
        if (isWarehouseExist) {
            setWarehouseError({
                row: rowIndex,
                error: "variation already exist in this warehouse"
            })
        }
        return isWarehouseExist
    }

    const onChangeInput = (e) => {
        const value = e.target.value;
        if (type === "select") {
            setWarehouseError({ row: -1, error: false })
            rows[rowIndex]["warehouseId"] = ""
            handleUpdateRows([...rows])
            if (checkWarehouse(value)) return
            else setWarehouseError({ row: -1, error: false })
        }
        setInputValue(value)
        rows[rowIndex][name] = value
        handleUpdateRows([...rows])
        if (rowErrors.length && rowErrors[rowIndex]) {
            rowErrors[rowIndex][name] = ''
            changeRowErrors([...rowErrors])
        }
    };

    useEffect(() => {
        setInputValue(rows[rowIndex][name])
    }, [rows, rowIndex, name])

    return (
        <TableCell align="left" name={name}>
            {
                type === "select" ?
                    <>
                        <select
                            value={inputValue}
                            name={`productVariationDetail${name}`}
                            type="text"
                            onChange={onChangeInput}
                            className={classes.input}
                        >
                            <option value="" disabled>select ware...</option>
                            {warehouses?.map((warehouse, i) => (
                                <option value={warehouse._id} key={i} style={{ color: "#000" }}>
                                    {warehouse.name}
                                </option>
                            ))}
                        </select>
                        {rowErrors[rowIndex] ? <small className={classes.errorText}>{rowErrors[rowIndex][name]}</small> : null}
                        {(warehouseError.row === rowIndex && warehouseError.error) ? <small className={classes.errorText}>{warehouseError.error}</small> : null}
                    </> :
                    <>
                        <input
                            value={inputValue}
                            name={name}
                            type="text"
                            onChange={onChangeInput}
                            className={classes.input}
                        />
                        {rowErrors[rowIndex] ? <small className={classes.errorText}>{rowErrors[rowIndex][name]}</small> : null}
                    </>
            }
        </TableCell>
    );
};

export default ProductVariationEditTableCell