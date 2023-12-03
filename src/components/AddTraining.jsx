import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { useState } from "react"
import "dayjs/locale/fi";

const AddTraining = (props) => {
    const CUSTOMER_URL = "https://traineeapp.azurewebsites.net/api/customers";
    const [dialogueOpen, setDialogueOpen] = useState(false);
    const [training, setTraining] = useState({
        activity: "",
        date: "",
        duration: "",
        customer: `${CUSTOMER_URL}/${props.customer.id}`,
    });
    const [snackbarMsg, setSnackbarMsg] = useState("Training added!");
    const [snackbarOpen, setSnackbarOpen] = useState(false);


    const handleClickOpen = () => {
        setDialogueOpen(true);
    }

    const handleClose = () => {
        setDialogueOpen(false);
    }

    const handleInputChange = (e) => {
        setTraining({ ...training, [e.target.name]: e.target.value })
    }

    const setDateTime = (newDate) => {
        newDate != null && setTraining({ ...training, date: newDate })
    }

    return (
        <>
            <Button size="small" onClick={handleClickOpen}>
                Add Training
            </Button>
            <Dialog open={dialogueOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Training</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" name="activity" value={training.activity} onChange={e => handleInputChange(e)} label="Activity" fullWidth />
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi">
                        <DateTimePicker label="Date" name="date" onChange={date => setDateTime(date)} />
                    </LocalizationProvider>
                    <TextField margin="dense" name="duration" value={training.duration} onChange={e => handleInputChange(e)} label="Duration (min)" fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { props.newTraining(training), setDialogueOpen(false), setSnackbarOpen(true) }} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)} message={snackbarMsg} />
        </>
    )
}

export default AddTraining