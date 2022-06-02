import React from 'react';
import { TextField, makeStyles,FormLabel } from '@material-ui/core';
import { useField } from 'formik';

const useStyes = makeStyles((theme) => ({
    root: {
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
    label:{
        color: theme.palette.secondary.main,
        margin:"12px 0"
    }
}))

const MyTextInput = ({label,...props}) => {

    const [field, meta] = useField(props);
    const classes = useStyes();

    return (
        <>
        {label && <FormLabel className={classes.label}>{label}</FormLabel>}
        <TextField
            {...props}
            variant="outlined"
            size="small"
            {...field}
            className={classes.root}
            inputProps={{ className: classes.input }}
        error={meta.touched &&  Boolean(meta.error)}
        helperText={meta.touched && meta.error }
        />
        </>
    )
}

export default MyTextInput
