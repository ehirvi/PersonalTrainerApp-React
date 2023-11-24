import { useEffect, useState } from "react"
import CustomerService from "../services/CustomerService";

const Customers = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => getCustomerList, []);

    const getCustomerList = () => {
        CustomerService
            .getAll()
            .then(allCustomers => setCustomers(allCustomers))
    }

    return (
        <>
            <ul>
                {customers.map(customer =>
                    <li key={customer.id}>{customer.firstname} {customer.lastname} {customer.email}</li>)}
            </ul>
        </>
    )
}

export default Customers