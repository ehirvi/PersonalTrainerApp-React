import { AppBar, Container, IconButton, Toolbar } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import './App.css'

function App() {


	return (
		<>
			<Container>
				<AppBar color='info' position='relative'>
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
