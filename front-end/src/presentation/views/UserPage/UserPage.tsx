import {
	AppBar,
	Box,
	Button,
	CssBaseline,
	Divider,
	Drawer,
	IconButton,
	ThemeProvider,
	Toolbar,
	Typography,
	createTheme,
} from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { TodoStore, actions } from '../../../store/store';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IStore } from '../../../core/interfaces/Store.interface';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import { NavigationDrawer } from './NavigationDrawer';
import { User } from '../../../core/models/User';

export const UserPage = () => {
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const isDarkMode = TodoStore.useState((s: IStore) => s.isDarkMode);
	const [connectedUser, setConnectedUser] = useState<User>();
	const navigate = useNavigate();
	const drawerWidth = 100;
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const [getUserFinished, getUserResult] = actions.getCurrentUser.useBeckon();

	useEffect(() => {
		if (getUserFinished && getUserResult.error) {
			navigate('/');
		}
		setConnectedUser(getUserResult.payload as User);
	}, [getUserFinished, getUserResult]);

	const theme = createTheme({
		palette: {
			mode: isDarkMode ? 'dark' : 'light',
		},
	});

	const switchThemeMode = () => {
		TodoStore.update(s => {
			s.isDarkMode = !isDarkMode;
		});
	};

	const logout = () => {
		localStorage.removeItem('token');
		sessionStorage.removeItem('token');
		TodoStore.update(s => {
			s.token = null;
			s.currentUser = undefined;
		});
		navigate('/');
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<AppBar
					position="fixed"
					sx={{
						width: { sm: `calc(100% - ${drawerWidth}px)` },
						ml: { sm: `${drawerWidth}px` },
					}}>
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ display: { sm: 'none' }, mr: 2 }}
							onClick={handleDrawerToggle}>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							{connectedUser
								? `${connectedUser.firstName} ${connectedUser.lastName}`
								: ''}
						</Typography>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
							onClick={switchThemeMode}>
							{isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
						</IconButton>
						<Button color="inherit" onClick={logout}>
							Logout
						</Button>
					</Toolbar>
				</AppBar>
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}>
					<Toolbar />
					<Divider />
					<NavigationDrawer />
				</Drawer>
				<Drawer
					sx={{
						display: { xs: 'none', sm: 'block' },
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							backgroundImage:
								'linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15))',
							width: drawerWidth,
							boxSizing: 'border-box',
						},
					}}
					variant="permanent"
					anchor="left">
					<Toolbar />
					<Divider />
					<NavigationDrawer />
				</Drawer>
				<Box sx={{ ml: { sm: `${drawerWidth}px` } }}>
					<Outlet />
				</Box>
			</ThemeProvider>
		</Box>
	);
};
