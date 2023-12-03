import axios from "axios";

const GET_URL = "https://traineeapp.azurewebsites.net/getcustomers";
const POST_URL = "https://traineeapp.azurewebsites.net/api/customers";

const getAll = () => (
    axios
        .get(GET_URL)
        .then(promise => promise.data)
)

const addOne = (customer) => (
    axios
        .post(POST_URL, customer)
        .then(promise => promise.data)
)

const updateOne = (customer) => (
    axios
        .put(`${POST_URL}/${customer.id}`, customer)
        .then(promise => promise.data)
)

const deleteOne = (id) => (
    axios
        .delete(`${POST_URL}/${id}`)
        .then(promise => promise.data)
)


export default { getAll, addOne, updateOne, deleteOne }