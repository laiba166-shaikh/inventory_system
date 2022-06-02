import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, makeStyles,Typography, DialogContent, DialogActions, Button } from '@material-ui/core';
import Loader from '../Loader';
import { UseDisplayImage } from "../../utility/UseDisplayImage";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiDialog-paper": {
            backgroundColor: "#e6e6e6",
            width: '400px',
            height: "300px"
        },
    },
    formTitle: {
        borderBottom: "1px solid rgba(0,0,0,0.5)"
    },
}))

const ImageUpload = ({ show, handleClose, rows, setRows, targetItem }) => {
    const classes = useStyles()
    const { ImagePreview } = UseDisplayImage()
    const [imageFile, setImageFile] = useState("")
    const [previewRes, setPreviewRes] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChangeImage = (e) => {
        setImageFile(e.target.files[0])
        rows[targetItem - 1].img = e.target.files[0]
        setRows([...rows])
        const resultPromise = ImagePreview(e.target.files[0])
        Promise.all(resultPromise).then(value => {
            setPreviewRes(value[0].imageUrl)
        })
    }

    const handleUpload = () => {
        if (previewRes) {
            rows[targetItem - 1].preview = previewRes
            setRows([...rows])
            handleClose()
        }
    }
    const handleCancel = () => {
        handleClose()
    }

    useEffect(() => {
        console.log(targetItem)
        if (targetItem) {
            if (rows[targetItem - 1].img || rows[targetItem - 1].preview) {
                rows[targetItem - 1].img && setImageFile(rows[targetItem - 1].img)
                rows[targetItem - 1].preview && setPreviewRes(rows[targetItem - 1].preview)
            } else {
                setImageFile("")
                setPreviewRes("")
            }
        }
    }, [targetItem])

    return (
        <Dialog open={show} onClose={handleClose} className={classes.root}>
            {loading && <Loader />}
            <DialogTitle className={classes.formTitle}>
                <Typography variant='h4'>
                    Upload Image
                </Typography>
            </DialogTitle>
            <DialogContent>
                <input type="file" onChange={handleChangeImage} />
                {previewRes && <img src={previewRes} alt="preview" style={{ width: '150px', height: '150px', overflow: 'auto', margin: '10px 0' }} />}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleUpload} variant="contained" color="primary">Save</Button>
                <Button onClick={handleCancel} variant="contained" color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImageUpload;
