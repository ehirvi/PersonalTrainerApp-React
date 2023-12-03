import { AppBar, Button, Container, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import { ChevronLeft } from '@mui/icons-material'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ContactsIcon from '@mui/icons-material/Contacts'
import './App.css'
import { grey } from '@mui/material/colors'


function App() {
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleDrawer = () => {
		drawerOpen ? setDrawerOpen(false) : setDrawerOpen(true);
	}

	return (
		<>
			<Container>
				<AppBar color='info' position='relative'>
					<Toolbar variant='dense'>
						<IconButton edge='start' color='inherit' onClick={handleDrawer}>
							<MenuIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Drawer
					variant='persistent'
					anchor='left'
					open={drawerOpen}>
					<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
						<IconButton onClick={handleDrawer}>
							<ChevronLeft />
						</IconButton>
					</div>
					<List>
						<ListItem component={Link} to={"/"} disableGutters disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<ContactsIcon />
								</ListItemIcon>
								<ListItemText primary="Trainings" sx={{color: "black"}}></ListItemText>
							</ListItemButton>
						</ListItem>

						<ListItem component={Link} to={"/customers"} disableGutters disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<DirectionsRunIcon />
								</ListItemIcon>
								<ListItemText primary="Customers" sx={{color: "black"}}></ListItemText>
							</ListItemButton>
						</ListItem>
					</List>
				</Drawer>
				<Outlet />
			</Container >
		</>
	)
}

export default App
