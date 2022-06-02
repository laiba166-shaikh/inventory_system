import React from 'react'
import { makeStyles, Box,FormControl, Select, FormHelperText, TextField } from '@material-ui/core';
import { mergeClasses } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    selectBox:{
        background:"transparent",
        border:`1px solid ${theme.palette.secondary.main}`,
        borderRadius:"3px",
        color:theme.palette.secondary.main,
        "& .MuiSelect-select.MuiSelect-select":{
            padding:"4px 8px",
            "&:hover":{
                border:"none",
                outlin:"none"
            }
        }
    }
}))

const FilterSelect = ({filter,filterOptions,setFilterValue,label}) => {
    const classes = useStyles()
    return (
        <Box sx={{ minWidth: 140,margin:"0 6px" }}>
            <FormControl fullWidth>
                <TextField
                    labelId="ware-simple-select-label"
                    id="warehouse-simple-select"
                    placeholder={label}
                    select={true}
                    value={filter}
                    className={classes.selectBox}
                    onChange={(e) => setFilterValue(e.target.value)}
                >
                    {
                        filterOptions ?
                            [{
                                name: "All",
                                _id: ""
                            }, ...filterOptions].map((filter, idx) => (
                                <option key={idx} value={filter._id}>{filter.name}</option>
                            ))
                            :
                            ''
                    }
                </TextField>
                <FormHelperText sx={{ color: "secondary.main" }}>{label}</FormHelperText>
            </FormControl>
        </Box>
    )
}

export default FilterSelect