import React, { useEffect } from 'react';
import { TextField, makeStyles, FormLabel } from '@material-ui/core';
import { useField } from 'formik';

const useStyes = makeStyles((theme) => ({
    root: {
        "& .MuiInputBase-root": {
            minWidth: "220px",
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: "5px",
            '& fieldset': {
                borderColor: theme.palette.secondary.light,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.secondary.light,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.secondary.main,
            },
        },
    },
    input: {
        color: theme.palette.secondary.main
    },
    label: {
        color: theme.palette.secondary.main,
        margin: "12px 0"
    }
}))

const Select = ({ label, ...resProps }) => {
    const classes = useStyes();
    const [field, meta] = useField(resProps);

    //iNPUT lABEL id AND Select labelId should be same
    return (
        <>
            {label && <FormLabel className={classes.label}>{label}</FormLabel>}
            <TextField
                {...field}
                {...resProps}
                variant="outlined"
                select={true}
                size="small"
                className={classes.root}
                sx={{ width: "130px" }}
                inputProps={{ className: classes.input }}
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
            />
        </>

    )
};

export default Select;