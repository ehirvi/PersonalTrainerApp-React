import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from "@mui/material";
import { useState } from "react"
import { Edit } from "@mui/icons-material";

const EditCustomer = (props) => {
    const [dialogueOpen, setDialogueOpen] = useState(false);
    const [customer, setCustomer] = useState({
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        streetaddress: "",
        postcode: "",
        city: ""
    });
    const [snackbarMsg, setSnackbarMsg] = useState("Edit succesful!");
    const [snackbarOpen, setSnackbarOpen] = useState(false);


    const handleClickOpen = () => {
        setCustomer({
            id: props.customer.id,
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            email: props.customer.email,
            phone: props.customer.phone,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city
        });
        setDialogueOpen(true);
    }

    const handleClose = () => {
        setDialogueOpen(false);
    }

    const handleInputChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value })
    }


    return (
        <>
            <Button startIcon={<Edit />} onClick={handleClickOpen}></Button>
            <Dialog open={dialogueOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" name="firstname" value={customer.firstname} onChange={e => handleInputChange(e)} label="First Name" fullWidth />
                    <TextField margin="dense" name="lastname" value={customer.lastname} onChange={e => handleInputChange(e)} label="Last Name" fullWidth />
                    <TextField margin="dense" name="email" value={customer.email} onChange={e => handleInputChange(e)} label="Email" fullWidth />
                    <TextField margin="dense" name="phone" value={customer.phone} onChange={e => handleInputChange(e)} label="Phone" fullWidth />
                    <TextField margin="dense" name="streetaddress" value={customer.streetaddress} onChange={e => handleInputChange(e)} label="Address" fullWidth />
                    <TextField margin="dense" name="postcode" value={customer.postcode} onChange={e => handleInputChange(e)} label="Postcode" fullWidth />
                    <TextField margin="dense" name="city" value={customer.city} onChange={e => handleInputChange(e)} label="City" fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { props.updateCustomer(customer), setDialogueOpen(false), setSnackbarOpen(true) }} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)} message={snackbarMsg} />
        </>
    )


}

export default EditCustomer