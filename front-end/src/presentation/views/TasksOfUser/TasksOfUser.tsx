import * as React from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { AppContext } from '../../../index';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';

export const TasksOfUser = () => {
	const appModule = useContext(AppContext);
	const connectedUser = appModule.hooks.useConnectedUser();

	return (
		<Box
			sx={{
				bgcolor: 'primary.dark',
			}}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						{connectedUser
							? `${connectedUser.firstName} ${connectedUser.lastName}`
							: ''}
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
