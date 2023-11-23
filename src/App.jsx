import { useEffect, useState } from 'react'
import TrainingService from './services/TrainingService';

function App() {
	const [trainings, setTrainings] = useState([]);

	useEffect(() => getTrainingsList, []);

	const getTrainingsList = () => {
		TrainingService
			.getAll()
			.then(allTrainings => setTrainings(allTrainings))
	}

	return (
		<>
			<ul>
				{trainings.map(training =>
					<li key={training.id}>{training.activity} {training.date} {training.duration} min {training.customer.firstname} {training.customer.lastname}</li>)}
			</ul>
		</>
	)
}

export default App
