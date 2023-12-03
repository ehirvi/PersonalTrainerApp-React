import { useEffect, useRef, useState } from 'react'
import TrainingService from '../services/TrainingService';
import { AgGridReact } from 'ag-grid-react';
import { Button, Snackbar } from '@mui/material';
import dayjs from 'dayjs';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import DeleteIcon from '@mui/icons-material/Delete';


const TrainingsGrid = (props) => {

	const columns = [
		{
			headerName: "Actions",
			cellRenderer: params =>
				<Button startIcon={<DeleteIcon />} onClick={() => props.deleteTraining(params.data)}></Button>, width: 120
		},
		{ headerName: "Activity", field: "activity", sortable: true, filter: true, floatingFilter: true },
		{
			headerName: "Date", valueGetter:
				(params) => dayjs(params.data.date).format("DD.MM.YYYY HH:mm"),
			sortable: true, filter: true, floatingFilter: true
		},
		{ headerName: "Duration", field: "duration", sortable: true, filter: true, floatingFilter: true },
		{
			headerName: "Customer", valueGetter:
				(params) => params.data.customer.firstname + " " + params.data.customer.lastname,
			sortable: true, filter: true, floatingFilter: true
		}
	]

	return (
		<div className='ag-theme-material' style={{ height: "700px", width: "100%", margin: "auto" }}>
			<AgGridReact
				ref={props.gridRef}
				onGridReady={params => props.gridRef.current = params.api}
				rowSelection='single'
				animateRows={true}
				columnDefs={columns}
				rowData={props.trainings}
				pagination={true}>
			</AgGridReact>
		</div>
	)
}


const Trainings = () => {
	const [trainings, setTrainings] = useState([]);
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const gridRef = useRef();

	useEffect(() => getTrainingsList, []);

	const getTrainingsList = () => {
		TrainingService
			.getAll()
			.then(allTrainings => setTrainings(allTrainings))
	}

	const deleteTraining = (training) => {
		if (window.confirm("Are you sure?")) {
			TrainingService
				.deleteOne(training.id)
				.then(res => {
					setSnackbarOpen(true),
						getTrainingsList()
				})
		}
	}

	return (
		<>
			<TrainingsGrid trainings={trainings} gridRef={gridRef} deleteTraining={deleteTraining} />
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={4000}
				onClose={() => setSnackbarOpen(false)}
				message={"Deleted Succesfully!"} />
		</>
	)
}

export default Trainings