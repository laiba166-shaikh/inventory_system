import React,{useState,useEffect} from 'react'
import { makeStyles, FormControl, FormHelperText, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        display: "flex",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "transparent",
        border: "1px solid #4f4f4f",
        '&:hover': {
            backgroundColor: "transparent",
        },
        marginRight: theme.spacing(1),
        marginLeft: "0px",
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(0),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 1),
        height: '100%',
        // position: 'absolute',
        display: 'flex',
        cursor: "pointer",
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(0.5),
        // vertical padding + font size from searchIcon
        // paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
        transition: theme.transitions.create('width'),
        width: '14ch',
        [theme.breakpoints.up('md')]: {
            width: '14ch',
        },
    },
}))

const SearchBox = ({label,changeSearchValue}) => {
    const classes = useStyles()
    const [value,setValue] = useState("")

    const setSearchValue=()=>{
        changeSearchValue(value)
    }
    useEffect(()=>{
        if(value===""){
            changeSearchValue("")
        }
    },[value])

    return (
        <FormControl>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon onClick={setSearchValue}/>
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    value={value}
                    onChange={(e)=>setValue(e.target.value)}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
            <FormHelperText sx={{ color: "secondary.main" }}>{label}</FormHelperText>
        </FormControl>
    )
}

export default SearchBox