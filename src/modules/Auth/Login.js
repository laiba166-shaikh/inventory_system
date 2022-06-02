import React from "react";
import {Grid, makeStyles } from "@material-ui/core";
import SigninForm from "../../components/auth/SigninForm";

const useStyles=makeStyles((theme)=>({
    root:{
        backgroundColor:theme.palette.primary.light,
        boxSizing:'border-box',
        height:'100%',
        width:'100%',
        display:"flex",
        alignItems:"center"
        // overflow:'hidden',
    }
}))

const Login=()=>{
    const classes = useStyles()
    return (
        <Grid container className={classes.root}>
            <SigninForm/>
        </Grid>
    )
};

export default Login;