import axios from "axios";

const GET_URL = "https://traineeapp.azurewebsites.net/gettrainings";
const POST_URL = "https://traineeapp.azurewebsites.net/api/trainings";

const getAll = () => (
    axios
        .get(GET_URL)
        .then(promise => promise.data)
)

const addOne = (training) => (
    axios
        .post(POST_URL, training)
        .then(promise => promise.data)
)


export default { getAll, addOne }