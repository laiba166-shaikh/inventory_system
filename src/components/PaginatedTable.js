import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles
} from "@material-ui/core";
import Loader from "./Loader";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    overflow: "hidden",
    color: theme.palette.secondary.main,
    "& .MuiTableContainer-root": {
      maxHeight: "100%",
      // overflow: "auto",
    },
    "& .MuiTableCell-body": {
      color: theme.palette.secondary.light
    },
    "& .MuiTableCell-root": {
      padding: "0.5em 0.6em",
      borderBottom: 0
    },
    "& .MuiTableCell-stickyHeader": {
      backgroundColor: theme.palette.primary.main,
      color:theme.palette.secondary.light,
      fontWeight:"bold",
      borderBottom:`2px solid ${theme.palette.secondary.light}`
    },
    "& .MuiTableBody-root .MuiTableRow-root:nth-child(odd)":{
      backgroundColor:"#e5e5e5"
    },
    "& .MuiTableBody-root .MuiTableRow-root:nth-child(even)":{
      backgroundColor:"#f6f7f8"
    }
  },
  pagination: {
    "& .MuiTablePagination-toolbar": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.secondary.light
    },
    "& .MuiIconButton-root.Mui-disabled": {
      color: theme.palette.secondary.main,
      backgroundColor: "transparent",
    }
  },
}))

const PaginatedTable = ({ columns, fetchData, data, totalCount, navigation, params}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [totalSize, setTotalSize] = useState(0);

  useEffect(()=>{
    if(params){
      setPage(0)
    }
  },[params])

  useEffect(() => {
    setLoading(true);
    if(params){
      fetchData(page, rowsPerPage,params)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => setLoading(false));
    }else {
      fetchData(page, rowsPerPage)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => setLoading(false));
    }
  }, [page, rowsPerPage,params,fetchData]);

  useEffect(() => {
    setCurrentData([...data]);
    setTotalSize(totalCount);
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const classes = useStyles()
  return (
    <>
      <TableContainer className={classes.root}>
        {loading && <Loader />}
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.label} onClick={() => { navigation && navigation(row._id) }}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format
                            ? column.format(row)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10,20,50,100]}
        component="div"
        count={totalSize}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className={classes.pagination}
      />
    </>
  );
}

export default PaginatedTable;