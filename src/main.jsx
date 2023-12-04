import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Trainings from './components/Trainings.jsx'
import Customers from './components/Customers.jsx'
import TrainingCalendar from './components/TrainingCalendar.jsx'

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				element: <Trainings />,
				index: true
			},
			{
				path: "customers",
				element: <Customers />
			},
			{
				path: "calendar",
				element: <TrainingCalendar/>
			}
		]
	}
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
