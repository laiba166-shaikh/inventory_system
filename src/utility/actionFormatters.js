import React, { useState, useEffect } from "react"
import { EditOutlined, DeleteOutlined, Visibility } from "@material-ui/icons";
import { FormControlLabel, makeStyles, Switch, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: 22,
        margin: "0 3px",
        cursor: "pointer",
    }
}))

export function ActionColumnFormatter(rowData) {
    const classes = useStyles()
    return (
        <>
            <span onClick={() => rowData.onEdit(rowData.value._id)}>
                <EditOutlined style={{ color: "#2e7d32" }} className={classes.icon} />
            </span>
            {!rowData.dontView && <span onClick={() => rowData.onClickView(rowData.value._id)}>
                <Visibility color="secondary" className={classes.icon} />
            </span>}
            {/* <span onClick={() => rowData.onDelete(rowData.value._id)}>
                <DeleteOutlined style={{ color: "#d32f2f" }} className={classes.icon} />
            </span> */}
        </>
    )
}

export function EditDeleteFormatter(rowData) {
    const classes = useStyles();
    return (
        <>
            <span onClick={() => rowData.onEdit(rowData.value._id)}>
                <EditOutlined style={{ color: "#2e7d32" }} className={classes.icon} />
            </span>
            <span onClick={() => rowData.onDelete(rowData.value._id)}>
                <DeleteOutlined style={{ color: "#d32f2f" }} className={classes.icon} />
            </span>
        </>
    )
}

export function StatusFormatter(rowData) {
    const theme = useTheme()
    const [status, setStatus] = useState(rowData.value.isActive)

    useEffect(() => {
        rowData.onChangeStatus({ ...rowData.value, isActive: status })
    }, [status])

    return (
        <>
            <FormControlLabel
                control={
                    <Switch
                        checked={status}
                        size="small"
                        color="secondary"
                        onChange={(ev) => setStatus(ev.target.checked)}
                    />
                }
                label=""
            />
        </>
    )
}