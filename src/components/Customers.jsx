import { useEffect, useRef, useState } from "react"
import CustomerService from "../services/CustomerService";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";


const CustomersGrid = (props) => {

    const columns = [
        {
            headerName: "Actions",
            cellRenderer: params =>
                <Button startIcon={<Delete />}></Button>, width: 120
        },
        {
            cellRenderer: params =>
                <Button startIcon={<Edit />}></Button>, width: 120
        },
        {
            cellRenderer: params =>
                <Button size="small">Add Training</Button>
        },
        { headerName: "First Name", field: "firstname", sortable: true, filter: true, floatingFilter: true},
        { headerName: "Last Name", field: "lastname", sortable: true, filter: true, floatingFilter: true},
        { headerName: "Email", field: "email", sortable: true, filter: true, floatingFilter: true},
        { headerName: "Phone", field: "phone", sortable: true, filter: true, floatingFilter: true},
        { headerName: "Address", field: "streetaddress", sortable: true, filter: true, floatingFilter: true},
        { headerName: "Post Code", field: "postcode", sortable: true, filter: true, floatingFilter: true},
        { headerName: "City", field: "city", sortable: true, filter: true, floatingFilter: true}
    ]

    return (
        <div className="ag-theme-material" style={{ height: "100vh", width: "100vw" }}>
            <AgGridReact
                ref={props.gridRef}
                onGridReady={params => props.gridRef.current = params.api}
                rowSelection="single"
                animateRows={true}
                columnDefs={columns}
                rowData={props.customers}>
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

    return (
        <CustomersGrid customers={customers} gridRef={gridRef} />
    )
}

export default Customers