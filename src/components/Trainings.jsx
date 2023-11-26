import { useEffect, useRef, useState } from 'react'
import TrainingService from '../services/TrainingService';
import { AgGridReact } from 'ag-grid-react';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import DeleteIcon from '@mui/icons-material/Delete';


const TrainingsGrid = (props) => {

	const columns = [
		{
			headerName: "Actions",
			cellRenderer: params =>
				<Button startIcon={<DeleteIcon/>}></Button>
		},
		{ headerName: "Activity", field: "activity", sortable: true, filter: true, floatingFilter: true },
		{
			headerName: "Date", valueGetter:
				(params) => dayjs(params.data.date).format("DD.MM.YYYY HH:MM"),
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
		<div className='ag-theme-material' style={{ height: "100vh", width: "100vw" }}>
			<AgGridReact
				ref={props.gridRef}
				onGridReady={params => props.gridRef.current = params.api}
				rowSelection='single'
				animateRows={true}
				columnDefs={columns}
				rowData={props.trainings}>
			</AgGridReact>
		</div>
	)
}


const Trainings = () => {
	const [trainings, setTrainings] = useState([]);

	const gridRef = useRef();

	useEffect(() => getTrainingsList, []);

	const getTrainingsList = () => {
		TrainingService
			.getAll()
			.then(allTrainings => setTrainings(allTrainings))
	}

	return (
		<>
			<TrainingsGrid trainings={trainings} gridRef={gridRef} />
		</>
	)
}


export default Trainings