import React, { useState, useEffect } from 'react'
import { makeStyles, Grid, Paper, FormControl, Box, FormHelperText, InputBase } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import { ActionColumnFormatter, EditDeleteFormatter } from '../../../../utility/actionFormatters';
import PaginatedTable from '../../../../components/PaginatedTable';
import PageHeader from "../../../../components/PageHeader";
import SearchBar from '../../../../controls/SearchBar';
import { getAllCategory } from '../../../../redux/Category/CategoryActions';
import { getAllProducts, deleteProduct } from '../../../../redux/ProductUpload/ProductUploadActions';
import { connect } from 'react-redux';
import FilterSelect from '../../../../controls/FilterSelect';
import SearchBox from '../../../../controls/SearchBox';
import { Delete } from '@material-ui/icons';
import DeleteModal from '../../modals/DeleteModal';

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
    },
    filterBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(2, 1)
    },
    search: {
        position: 'relative',
        display: "flex",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "transparent",
        border: "1px solid #4f4f4f",
        '&:hover': {
            backgroundColor: "transparent",
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
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
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}))

const Product = ({ products, totalCount, getAllProducts, getAllCategory, categories, deleteProduct }) => {
    const navigate = useNavigate();
    const classes = useStyles();

    const [showDelete, setShowDelete] = useState("")
    const [searchName, setSearchName] = useState("")
    const [category, setCategory] = useState("")
    const [searchSku, setSearchSku] = useState("")
    const [queryParams, setQueryParams] = useState({ name: "", categoryId: "", masterSku: "" })
    const handleSearchNameChange = (searchValue) => {
        setSearchName(searchValue)
    }
    const handleSearchSkuChange = (searchValue) => {
        setSearchSku(searchValue)
    }
    // const clearSearchQuery = () => {
    //     setSearchQuery("")
    //     setQueryParams({ ...queryParams, search: "" })
    // }

    useEffect(() => {
        if (searchName) {
            setQueryParams({ ...queryParams, name: searchName })
        } else {
            setQueryParams({ ...queryParams, name: "" })
        }
    }, [searchName])

    useEffect(() => {
        setQueryParams({ ...queryParams, categoryId: category })
    }, [category])

    useEffect(() => {
        setQueryParams({ ...queryParams, masterSku: searchSku })
    }, [searchSku])

    useEffect(() => {
        getAllCategory("", "")
    }, [])

    const productUiEvents = {
        addNewProductUploadClick: () => {
            navigate(`/main/admin/product/edit`)
        },
        editProductUploadClick: (id) => {
            navigate(`/main/admin/product/${id}/edit`)
        }
    }

    const handleDeleteOpen = (id) => {
        setShowDelete(id)
    }

    const handleDeleteClose = () => setShowDelete("")

    const columns = [
        // { id: '_id', label: 'Id', align: "center" },
        { id: 'name', label: 'Name', align: "left" },
        { id: 'categoryId', label: 'Category', align: 'left', format: (value) => value.categoryId.name },
        { id: 'description', label: 'Description', align: 'left' },
        { id: 'masterSku', label: 'SKU', align: 'left' },
        { id: "isActive", label: "Status", align: "left", format: (value) => <div>{value.isActive ? "Active" : "In-Active"}</div> },
        { id: "action", label: "Action", align: "left", format: (value) => <EditDeleteFormatter value={value} onEdit={productUiEvents.editProductUploadClick} onDelete={handleDeleteOpen} /> },
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={0} className={classes.container}>
                    <PageHeader
                        title='Product'
                        buttonTitle="Add New"
                        headerAction={productUiEvents.addNewProductUploadClick}
                    />
                    <Box className={classes.filterBox}>
                        <FilterSelect
                            filter={category}
                            setFilterValue={setCategory}
                            filterOptions={categories}
                            label="Select Category"
                        />
                        <SearchBox
                            searchValue={searchSku}
                            changeSearchValue={handleSearchSkuChange}
                            label="Search Product Sku"
                        />
                        <SearchBox
                            searchValue={searchName}
                            changeSearchValue={handleSearchNameChange}
                            label="Search Product Name"
                        />
                    </Box>
                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={products}
                        fetchData={getAllProducts}
                        params={queryParams}
                    />
                    <DeleteModal
                        show={showDelete !== ""}
                        handleClose={handleDeleteClose}
                        entityName={"Product"}
                        deleteAction={() => deleteProduct(showDelete)}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    products: state.products.products,
    totalCount: state.products.totalCount,
    categories: state.categories.category,
})

const actions = {
    getAllCategory,
    getAllProducts,
    deleteProduct
}

export default connect(mapStateToProps, actions)(Product);
