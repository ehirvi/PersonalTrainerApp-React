import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

function App() {


	return (
		<>
			<nav>
				<Link to={"/"}>Trainings</Link>
				<Link to={"/customers"}>Customers</Link>
			</nav>
			<Outlet />
		</>
	)
}

export default App
