import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from "@mui/material";
import { useState } from "react"

const AddCustomer = (props) => {
    const [dialogueOpen, setDialogueOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        streetaddress: "",
        postcode: "",
        city: ""
    });
    const [snackbarMsg, setSnackbarMsg] = useState("Customer added!");
    const [snackbarOpen, setSnackbarOpen] = useState(false);


    const handleClickOpen = () => {
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
            <Button style={{ margin: 10 }} variant="outlined" color="primary" onClick={handleClickOpen}>
                Add a customer
            </Button>
            <Dialog open={dialogueOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
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
                    <Button onClick={() => { props.newCustomer(customer), setDialogueOpen(false), setSnackbarOpen(true) }} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)} message={snackbarMsg} />
        </>
    )


}

export default AddCustomer