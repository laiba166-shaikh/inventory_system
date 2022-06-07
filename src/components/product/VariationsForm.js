import React, { useState, useEffect, useRef } from 'react';
import { EditOutlined, DeleteOutlined } from "@material-ui/icons";
import { Grid, makeStyles, MenuItem, Button, Box, Typography } from '@material-ui/core';
import { BasicSelect } from '../../controls';
import { v4 as uuidv4 } from 'uuid';
import { getOptionsValues } from '../../utility/productVariations';

const useStyles = makeStyles((theme) => ({
    root: {
        "& input": {
            outline: "none",
            background: "transparent",
            border: "1px solid #c1c1c1",
            height: "36px",
            color: theme.palette.secondary.main,
            padding: "0 10px",
        },
        "& .MuiFormHelperText-root": {
            fontSize: "0.75rem",
            color: "#f44336"
        }
    },
    selectedVariaton: {
        color: theme.palette.secondary.main,
        display: "flex",
        "& span": {
            marginLeft: "16px",
            textDecoration: "underline",
            cursor: "pointer",
            fontWeight: 200,
            color: theme.palette.secondary.light
        }
    },
    addOption: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: "16px",
        marginBottom: "12px",
    },
    icon: {
        fontSize: 22,
        margin: "0 3px",
        cursor: "pointer",
    },
    optionList: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        height: "150px",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
            width: 6,
        },
        "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.08)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.08)",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.2)",
        },
        "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(0,0,0,.4)",
        },
        "& span": {
            border: "1px solid #c1c1c1",
            padding: "6.5px 4px"
        }
    }
}))

const VariationsForm = ({ variationTypes = [], variations, index, handleChangeVariation, storeVariations }) => {
    const classes = useStyles();
    const inputRefs = useRef([])

    const [showOptions, setShowOptions] = useState(false);
    const [optionValue, setOptionValue] = useState({ id: "", optionName: "" });
    const [optionList, setOptionList] = useState([])
    const [varcategory,setCategory]=useState({})

    const handleSelectVariation = (e) => {
        const value = e.target.value
        // if select same variation as before
        if (variations.some(prev => prev.variationTypeId === value)) return
        variations[index].name = variationTypes.find(vart => vart._id === value).name
        variations[index].variationTypeId = value
        handleChangeVariation([...variations])
        setShowOptions(true)
    }
    const handleAddOption = () => {
        // add same option as already in the list
        const isExist = optionList.some(option => option.id === optionValue.id)
        if (isExist) {
            setOptionValue({ id: "", optionName: "" })
            return
        }
        //add new item in list
        setOptionList([...optionList, { optionName: optionValue.optionName, id: optionValue.optionName }])
        //reset state
        setOptionValue({ id: "", optionName: "" })
    }
    const handleChangeOptionValue = (e, optIndex) => {
        optionList[optIndex].optionName = e.target.value
        setOptionList([...optionList])
    }
    const handleDeleteOption = (deleteIndex) => {
        const remainOptions = optionList.filter((_, index) => index !== deleteIndex)
        setOptionList([...remainOptions])
        if (remainOptions.length === 0) {
            handleDeleteVariation()
        }
    }
    const handleDeleteVariation = () => {
        if (variations.length > 1) {
            const singleVar = variations.filter((_, varIndex) => varIndex !== index)
            handleChangeVariation(singleVar) //set single array
            setOptionList([...singleVar[0].options])
        } else {
            handleChangeVariation([{
                name: "",
                variationTypeId: "",
                options: [],
            }])
            setOptionList([])
        }
    }
    const handleFocusOption = (index) => {
        inputRefs.current[index].focus()
    }

    useEffect(()=>{
        console.log('debug6 ->',variations,index)
        if(variations[index].name!==''){
            setShowOptions(true)
        }else setShowOptions(false)
    },[variations,index])

    useEffect(() => {
        if (storeVariations?.length >= 1) {
            console.log("storeVariations",storeVariations)
            const variationsOptions = storeVariations[index]?.options
            setOptionList([...variationsOptions])
        }
    }, [storeVariations])
    

    useEffect(() => {
        variations[index].options = optionList
        handleChangeVariation([...variations])
        // inputRefs.current = inputRefs.current.slice(0, optionList.length) //?
    }, [optionList, index])
    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item md={5} sm={5}>
                {variations[index].name === "" ?
                    <BasicSelect
                        label="Select Variation Type"
                        fullWidth={true}
                        name="variationType"
                        disabled={variationTypes.length === 0}
                        onChange={handleSelectVariation}
                        InputLabelProps={{ shrink: true }}
                        helperText={variationTypes.length === 0 ? "This category has no variation" : ""}
                    >
                        {variationTypes?.map((variationType, i) => (
                            <MenuItem
                                value={variationType._id}
                                key={i}
                            >
                                {variationType.name}
                            </MenuItem>
                        ))}
                    </BasicSelect> :
                    <Box className={classes.selectedVariaton}>
                        <Typography variant="body1">
                            {variations[index].name}
                        </Typography>
                        <span onClick={handleDeleteVariation}>Delete</span>
                    </Box>
                }
            </Grid>
            <Grid item md={7} sm={7}>
                {(showOptions || variations[index]?.options?.length >= 1) &&
                    <Box>
                        <Box className={classes.addOption}>
                            <input type="text" value={optionValue.optionName} onChange={(e) => setOptionValue({ ...optionValue, optionName: e.target.value })} />
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{ marginLeft: "6px" }}
                                onClick={handleAddOption}
                                disabled={optionValue.optionName === ""}
                            >Add
                            </Button>
                        </Box>
                        <Box>
                            <div className={classes.optionList} id={`option-list-${index}`}>
                                {optionList?.map((option, ix) => (
                                    <div style={{ margin: "6px 8px 0" }} className="option-item">
                                        <input
                                            type="text"
                                            ref={el => inputRefs.current[ix] = el}
                                            value={option.optionName}
                                            onChange={(e) => handleChangeOptionValue(e, ix)}
                                        />
                                        <span onClick={() => handleFocusOption(ix)}>
                                            <EditOutlined style={{ color: "#2e7d32" }} className={classes.icon} />
                                        </span>
                                        <span onClick={() => handleDeleteOption(ix)}>
                                            <DeleteOutlined style={{ color: "#d32f2f" }} className={classes.icon} />
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Box>
                    </Box>
                }
            </Grid>
        </Grid>
    )
}

export default VariationsForm