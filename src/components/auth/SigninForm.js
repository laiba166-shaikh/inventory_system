import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, TextField, Checkbox, FormControlLabel, Button, Box } from '@material-ui/core';
import { useNavigate } from 'react-router';
import LoginImage from "../../assets/login-1.png";
import { signin } from "../../redux/Auth/AuthActions";
import { connect, useSelector } from 'react-redux';
import Loader from '../Loader';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 450,
        borderRadius: '3px',
        backgroundColor: theme.palette.primary.light,
        boxShadow: "1px .5px 2px 3px rgba(0,0,0,.2)",
        position: "relative",
        margin: "0 auto",
        display: "flex",
        "& .MuiTextField-root": {
            width: "240px",
        },
        "& .MuiFormLabel-root": {
            color: theme.palette.secondary.main
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: "0px",
            '& fieldset': {
                top: 0,
                // borderColor: 'rgba(255,255,255,0.5)',
                borderColor: theme.palette.secondary.light
            },
            '&:hover fieldset': {
                borderColor: theme.palette.secondary.light,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.secondary.light,
            },
        },
    },
    // imgContainer: {
    //     backgroundColor: theme.palette.primary.dark,
    //     width:"50%"
    // },
    // image: {
    //     width: "100%",
    //     height: "100%",
    //     overflow: "hidden",
    //     backgroundSize: "cover",
    // },
    form: {
        width: "100%",
        padding: '64px 32px',
        [theme.breakpoints.down('sm')]: {
            padding: '50px 18px'
        }
    },
    fieldsContainer: {
        display: "flex",
        flexDirection: "column",
        margin:"0 auto"
    },
    title: {
        textAlign: 'center',
        color: theme.palette.secondary.main,
        marginBottom: "8px",
    },
    textField: {
        borderRadius: '0px',
        color: theme.palette.secondary.light,
        '&::placeholder': {
            color: theme.palette.secondary.light
        },
        "&.Mui-focused": {
            color: theme.palette.secondary.light
        }
    },
    submitButton: {
        marginTop: 20,
        color: '#fff',
    }
}))

const SigninForm = ({ signin }) => {
    const classes = useStyles();
    const navigate = useNavigate()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(false)

    const { authLoading, error, user } = useSelector((state) => ({
        authLoading: state.auth.authLoading,
        error: state.auth.error,
        user: state.auth.userData
    }))

    useEffect(() => {
        if (user?.id) {
            navigate("/main/admin/warehouse")
        }
    }, [user])

    useEffect(() => {
        if (error) setShowError(true)
    }, [error])

    const handleShow = () => setShowPassword(!showPassword)
    const handleErrorClose = () => setShowError(false);

    const handleSubmit = () => {
        signin(username, password)
        setUsername("")
        setPassword("")
    }
    return (
        <Box className={classes.root}>
            {authLoading && <Loader />}
            {/* <Box className={classes.imgContainer}>
                <img
                    src={LoginImage}
                    alt=""
                    className={classes.image}
                />
            </Box> */}
            <Box className={classes.form}>
                <Typography variant='h4' className={classes.title}>
                    User Login
                </Typography>
                <Box className={classes.fieldsContainer}>
                    {/* <Grid item md={12} xs={12}>  */}
                    <TextField
                        id="outlined-basic-1"
                        variant="outlined"
                        label=""
                        placeholder="username/email"
                        size="small"
                        margin="normal"
                        onFocus={handleErrorClose}
                        value={username}
                        autoComplete={"off"}
                        onChange={(e) => setUsername(e.target.value)}
                        inputProps={{ className: classes.textField }}
                    />
                    {/* </Grid> */}
                    {/* <Grid item md={12} xs={12}> */}
                    <TextField
                        id="outlined-basic-2"
                        variant="outlined"
                        label=""
                        placeholder="password"
                        size="small"
                        // color="secondary"
                        onFocus={handleErrorClose}
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        inputProps={{ className: classes.textField }}
                    />
                    {/* </Grid> */}
                    {/* <Grid item md={12} xs={12} style={{marginLeft:"0px"}}> */}
                    <FormControlLabel control={<Checkbox onClick={handleShow} />} sx={{ color: 'secondary.main' }} label="Show Password" />
                    <div style={{ color: "#d32f2f" }}>{showError && error}</div>
                    {/* </Grid> */}
                </Box>'
                <Button variant='contained' color="secondary" className={classes.submitButton} onClick={handleSubmit}>
                    Sign in
                </Button>
            </Box>
        </Box>
    )
}
const actions = ({
    signin
})
export default connect(null, actions)(SigninForm)