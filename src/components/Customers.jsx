import { useEffect, useRef, useState } from "react"
import CustomerService from "../services/CustomerService";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";


const CustomersGrid = (props) => {

    const columns = [
        {
            headerName: "Actions",
            cellRenderer: params =>
                <Button startIcon={<Delete />}></Button>, width: 120
        },
        {
            cellRenderer: params =>
                <EditCustomer customer={params.data} updateCustomer={props.updateCustomer} />, width: 120
        },
        {
            cellRenderer: params =>
                <Button size="small">Add Training</Button>
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
                onGridReady={params => props.gridRef.current = params.api}
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

    return (
        <>
            <AddCustomer newCustomer={newCustomer} />
            <CustomersGrid customers={customers} gridRef={gridRef} updateCustomer={updateCustomer} />
        </>
    )
}

export default Customers