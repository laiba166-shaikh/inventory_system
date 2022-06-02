import React, { useState } from 'react'
import { makeStyles, Grid, Paper } from '@material-ui/core';
import { Routes, Route, useNavigate } from "react-router-dom";
import { ActionColumnFormatter } from '../../../../utility/actionFormatters';
import PaginatedTable from '../../../../components/PaginatedTable';
import PageHeader from "../../../../components/PageHeader";
import VariationTypeEditDialog from './VariationTypeEditDialog';
import { getAllVariationType } from '../../../../redux/variationType/variatonTypeActions';
import { connect } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "auto",
        backgroundColor: theme.palette.primary.light,
        boxSizing: "border-box",
    },
    container: {
        backgroundColor: "transparent",
        height: "100%",
        color: theme.palette.secondary.main,
        padding: theme.spacing(2)
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "10px 0px"
    }
}))

const ProductCategory = ({ variationTypes, totalCount, getAllVariationType }) => {
    const navigate = useNavigate();
    const classes = useStyles();

    const [variationTypeEditOpen, setVariationTypeEditOpen] = useState(true)
    const onVariationTypeEditClose = () => {
        setVariationTypeEditOpen(false)
        navigate(`/main/admin/variation-type`)
    }

    const VariationTypeUiEvents = {
        addNewVariationTypeClick: () => {
            navigate(`/main/admin/variation-type/new`)
            setVariationTypeEditOpen(true)
        },
        editVariationTypeClick: (id) => {
            navigate(`/main/admin/variation-type/${id}/edit`) //id is the specific record id from api send when click on edit btn
            setVariationTypeEditOpen(true)
        }
    }

    const columns = [
        { id: 'internalId', label: 'Id', align: "left" },
        { id: 'name', label: 'Name', align: "left" },
        { id: 'categoryId', label: 'Category', align: "left",format: (value) => value.categoryId.name },
        { id: "action", label: "Action", align: "left", format: (value) => <ActionColumnFormatter value={value} onEdit={VariationTypeUiEvents.editVariationTypeClick} dontView={true} /> },
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={0} className={classes.container}>
                    <PageHeader
                        title='Variation Type'
                        buttonTitle="Add New"
                        headerAction={() => VariationTypeUiEvents.addNewVariationTypeClick()}
                    />
                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={variationTypes}
                        fetchData={getAllVariationType}
                    />
                    <Routes>
                        <Route path="new" element={<VariationTypeEditDialog show={variationTypeEditOpen} onClose={onVariationTypeEditClose} />} />
                        <Route path=":id/edit" element={<VariationTypeEditDialog show={variationTypeEditOpen} onClose={onVariationTypeEditClose} />} />
                    </Routes>
                </Paper>
            </Grid>
        </Grid>
    )
}


const mapStateToProps = (state) => ({
    variationTypes: state.variationTypes.variationType,
    totalCount: state.variationTypes.totalCount
})

const actions = {
    getAllVariationType
}

export default connect(mapStateToProps, actions)(ProductCategory);
