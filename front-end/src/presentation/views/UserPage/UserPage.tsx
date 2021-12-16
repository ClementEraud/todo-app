import * as React from 'react';
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
import { AppContext } from '../../../index';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from 'react-router-dom';
import { User } from '../../../core/models/User';
import { store } from '../../../core/store';
import { useContext } from 'react';

export const UserPage = () => {
	const appModule = useContext(AppContext);
	const onLogout = appModule.hooks.useLogout();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const isDarkMode = store.useState(s => s.isDarkMode);
	const connectedUser: User = appModule.hooks.useConnectedUser();
	const drawerWidth = 100;
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const theme = createTheme({
		palette: {
			mode: isDarkMode ? 'dark' : 'light',
		},
	});

	const switchThemeMode = () => {
		store.update(s => {
			s.isDarkMode = !isDarkMode;
		});
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
						<Button color="inherit" onClick={onLogout}>
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
				</Drawer>
				<Drawer
					sx={{
						display: { xs: 'none', sm: 'block' },
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							width: drawerWidth,
							boxSizing: 'border-box',
						},
					}}
					variant="permanent"
					anchor="left">
					<Toolbar />
					<Divider />
				</Drawer>
				<Box sx={{ ml: { sm: `${drawerWidth}px` } }}>
					<Outlet />
				</Box>
			</ThemeProvider>
		</Box>
	);
};
