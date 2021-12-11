import * as React from 'react';
import {
	AppBar,
	Box,
	CssBaseline,
	Grid,
	IconButton,
	Paper,
	Toolbar,
	Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AppContext } from '../../../index';
import MenuIcon from '@mui/icons-material/Menu';
import { Task } from '../../../core/models/Task';
import { useContext } from 'react';

export const TasksOfUser = () => {
	const appModule = useContext(AppContext);
	const connectedUser = appModule.hooks.useConnectedUser();

	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
			<AppBar position="static">
				<Toolbar sx={{ bgcolor: 'toolBar.background' }}>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2, color: 'toolBar.text' }}>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, color: 'toolBar.text' }}>
						{connectedUser &&
							`${connectedUser.firstName} ${connectedUser.lastName}`}
					</Typography>
				</Toolbar>
			</AppBar>
			<Grid item xs={12} sx={{ height: '100vh' }}>
				<Box
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						'& > :not(style)': {
							m: 1,
							width: 128,
							height: 128,
							backgroundColor: '#fff',
							color: '#000',
						},
					}}>
					{connectedUser &&
						connectedUser.tasks.map((task: Task, i: number) => (
							<Paper key={i}>
								<Typography
									variant="h6"
									component="div"
									sx={{ textAlign: 'center' }}>
									{task.title}
								</Typography>
								{task.description}
							</Paper>
						))}

					<Paper
						sx={{
							backgroundColor: '#000 !important',
							border: 'dashed grey',
							color: 'grey !important',
						}}>
						<Typography
							variant="h6"
							component="div"
							sx={{
								textAlign: 'center',
							}}>
							Add Task
						</Typography>
						<Box
							sx={{
								paddingLeft: '35px',
								paddingTop: '15px',
							}}>
							<IconButton
								size="large"
								color="inherit"
								aria-label="menu"
								sx={{
									color: 'grey',
									transform: 'scale(2.1)',
								}}>
								<AddCircleOutlineIcon />
							</IconButton>
						</Box>
					</Paper>
				</Box>
			</Grid>
		</Grid>
	);
};
