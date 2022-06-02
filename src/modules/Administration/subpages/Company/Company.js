import React, { useState } from 'react'
import { makeStyles, Grid, Paper } from '@material-ui/core';
import { Routes, Route, useNavigate } from "react-router-dom";
import { ActionColumnFormatter } from '../../../../utility/actionFormatters';
import PaginatedTable from '../../../../components/PaginatedTable';
import PageHeader from "../../../../components/PageHeader";
import CompanyEditDialog from './CompanyEditDialog';
import { getAllCompanies } from '../../../../redux/Company/CompanyActions';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "auto",
        backgroundColor: theme.palette.primary.dark,
        boxSizing: "border-box",
    },
    container: {
        backgroundColor: "transparent",
        height: "100%",
        color: "#fff",
        padding: theme.spacing(2)
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "10px 0px"
    }
}))

const Company = ({ companies, totalCount, getAllCompanies }) => {
    const navigate = useNavigate();
    const classes = useStyles();

    const [view, setView] = useState(false)
    const [companyEditOpen, setCompanyEditOpen] = useState(true)

    const onCompanyEditClose = () => {
        setCompanyEditOpen(false)
        setView(false)
        navigate(`/main/admin/company`)
    }

    const handleViewOnly = (id) => {
        setView(true)
        CompanyUiEvents.editCompanyClick(id)
    }

    const CompanyUiEvents = {
        addNewCompanyClick: () => {
            navigate(`/main/admin/company/new`)
            setCompanyEditOpen(true)
        },
        editCompanyClick: (id) => {
            navigate(`/main/admin/company/${id}/edit`) //id is the specific record id from api send when click on edit btn
            setCompanyEditOpen(true)
        }
    }

    const columns = [
        { id: 'internalIdForBusiness', label: 'Id', align: "center" },
        { id: 'name', label: 'Name', align: "center" },
        { id: 'type', label: 'Type', align: 'center' },
        { id: 'phone', label: 'Phone Number', align: 'center' },
        { id: 'notes', label: 'Notes', align: 'center' },
        { id: "isActive", label: "Status", align: "center", format: (value) => <div>{value.isActive ? "Active" : "In-Active"}</div> },
        { id: "action", label: "Action", align: "center", format: (value) => <ActionColumnFormatter value={value} onEdit={CompanyUiEvents.editCompanyClick} onClickView={handleViewOnly} /> },
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={0} className={classes.container}>
                    <PageHeader
                        title='Company'
                        buttonTitle="Add New"
                        headerAction={() => CompanyUiEvents.addNewCompanyClick()}
                    />
                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={companies}
                        fetchData={getAllCompanies}
                    />
                    <Routes>
                        <Route path="new" element={<CompanyEditDialog show={companyEditOpen} onClose={onCompanyEditClose} />} />
                        <Route path=":id/edit" element={<CompanyEditDialog show={companyEditOpen} onClose={onCompanyEditClose} view={view} />} />
                    </Routes>
                </Paper>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    companies: state.companies.companies,
    totalCount: state.companies.totalCount
})
const actions = {
    getAllCompanies,
}

export default connect(mapStateToProps, actions)(Company);
