import { AppBar, Container, IconButton, Toolbar } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'

function App() {


	return (
		<>
			<Container maxWidth="lg">
				<AppBar color='info' position='absolute'>
					<Toolbar variant='dense'>
					<IconButton edge='start' color='inherit'>
						<MenuIcon/>
					</IconButton>
					<nav className='App'>
						<Link to={"/"}>Trainings</Link>
						<Link to={"/customers"}>Customers</Link>
					</nav>
					</Toolbar>
				</AppBar>
				<Outlet />
			</Container>
		</>
	)
}

export default App
