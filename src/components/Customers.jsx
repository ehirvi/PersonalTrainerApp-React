import { useCallback, useEffect, useRef, useState } from "react"
import CustomerService from "../services/CustomerService";
import { AgGridReact } from "ag-grid-react";
import { Button, Snackbar, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import TrainingService from "../services/TrainingService";


const CustomersGrid = (props) => {

    const columns = [
        {
            headerName: "Actions",
            cellRenderer: params =>
                <Button startIcon={<Delete />} onClick={() => props.deleteCustomer(params.data)}></Button>, width: 120
        },
        {
            cellRenderer: params =>
                <EditCustomer customer={params.data} updateCustomer={props.updateCustomer} />, width: 120
        },
        {
            cellRenderer: params =>
                <AddTraining customer={params.data} newTraining={props.newTraining} />
        },
        { headerName: "First Name", field: "firstname", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Last Name", field: "lastname", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Email", field: "email", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Phone", field: "phone", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Address", field: "streetaddress", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Post Code", field: "postcode", sortable: true, filter: true, floatingFilter: true },
        { headerName: "City", field: "city", sortable: true, filter: true, floatingFilter: true }
    ]

    return (
        <div className="ag-theme-material" style={{ height: "700px", width: "100%", margin: "auto" }}>
            <AgGridReact
                ref={props.gridRef}
                onGridReady={params => { props.gridRef.current = params.api }}
                rowSelection="single"
                animateRows={true}
                columnDefs={columns}
                rowData={props.customers}
                pagination={true}>
            </AgGridReact>
        </div>
    )
}


const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const gridRef = useRef();

    useEffect(() => getCustomerList, []);

    const getCustomerList = () => {
        CustomerService
            .getAll()
            .then(allCustomers => setCustomers(allCustomers))
    }

    const newCustomer = (customer) => {
        CustomerService
            .addOne(customer)
            .then(res => getCustomerList())
    }

    const updateCustomer = (customer) => {
        CustomerService
            .updateOne(customer)
            .then(res => getCustomerList())
    }

    const deleteCustomer = (customer) => {
        if (window.confirm("Are you sure?")) {
            CustomerService
                .deleteOne(customer.id)
                .then(res => {
                    setSnackbarOpen(true),
                        getCustomerList()
                })
        }
    }

    const newTraining = (training) => {
        TrainingService
            .addOne(training)
    }

    const exportData = useCallback(() => {
        gridRef.current.exportDataAsCsv({ fileName: "customers.csv", columnKeys: ["firstname", "lastname", "email", "phone", "streetaddress", "postcode", "city"] })
    }, [])

    return (
        <>
            <Typography variant="h5" textAlign="center">Customers</Typography>
            <AddCustomer newCustomer={newCustomer} />
            <Button style={{ margin: 10 }} variant="outlined" color="primary" onClick={exportData}>Export as CSV</Button>
            <CustomersGrid customers={customers} gridRef={gridRef} updateCustomer={updateCustomer} deleteCustomer={deleteCustomer} newTraining={newTraining} />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
                message={"Deleted Succesfully!"} />
        </>
    )
}

export default Customers