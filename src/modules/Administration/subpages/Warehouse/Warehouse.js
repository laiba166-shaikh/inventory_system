import React, { useState } from 'react'
import { makeStyles, Grid, Paper } from '@material-ui/core';
import { Routes, Route, useNavigate } from "react-router-dom";
import { ActionColumnFormatter } from '../../../../utility/actionFormatters';
import PaginatedTable from '../../../../components/PaginatedTable';
import PageHeader from "../../../../components/PageHeader";
import WarehouseEditDialog from './WarehouseEditDialog';
import { getAllWarehouses } from '../../../../redux/Warehouse/WarehouseActions';
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

const Warehouse = ({ warehouses, totalCount, getAllWarehouses }) => {
    const navigate = useNavigate();
    const classes = useStyles();

    const [view, setView] = useState(false)
    const [warehouseEditOpen, setWarehouseEditOpen] = useState(true)

    const onWarehouseEditClose = () => {
        setWarehouseEditOpen(false)
        setView(false)
        navigate(`/main/admin/warehouse`)
    }
    const handleViewOnly = (id) => {
        setView(true)
        WarehouseUiEvents.editWarehouseClick(id)
    }

    const WarehouseUiEvents = {
        addNewWarehouseClick: () => {
            navigate(`/main/admin/warehouse/new`)
            setWarehouseEditOpen(true)
        },
        editWarehouseClick: (id) => {
            navigate(`/main/admin/warehouse/${id}/edit`) //id is the specific record id from api send when click on edit btn
            setWarehouseEditOpen(true)
        }
    }

    const columns = [
        { id: 'name', label: 'Name', align: "left" },
        { id: 'address', label: 'Address', align: 'left' },
        { id: 'city', label: 'City', align: 'left' },
        { id: "isActive", label: "Status", align: "left", format: (value) => <div>{value.isActive ? "Active" : "In-Active"}</div> },
        { id: "action", label: "Action", align: "left", format: (value) => <ActionColumnFormatter value={value} onEdit={WarehouseUiEvents.editWarehouseClick} onClickView={handleViewOnly} /> },
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={0} className={classes.container}>
                    <PageHeader
                        title='Warehouse'
                        buttonTitle="Add New"
                        headerAction={() => WarehouseUiEvents.addNewWarehouseClick()}
                    />
                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={warehouses}
                        fetchData={getAllWarehouses}
                    />
                    <Routes>
                        <Route path="new" element={<WarehouseEditDialog show={warehouseEditOpen} onClose={onWarehouseEditClose} />} />
                        <Route path=":id/edit" element={<WarehouseEditDialog show={warehouseEditOpen} onClose={onWarehouseEditClose} view={view} />} />
                    </Routes>
                </Paper>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    warehouses: state.warehouses.warehouses,
    totalCount: state.warehouses.totalCount
})

const actions = {
    getAllWarehouses
}

export default connect(mapStateToProps, actions)(Warehouse);
