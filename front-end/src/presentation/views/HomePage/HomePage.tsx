import { Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Paper from '@mui/material/Paper';
import { TodoStore } from '../../../store/store';

const HomePage = () => {
	const imageLink = () => {
		const rnd = Math.floor(Math.random() * (1 - 6) + 6);
		return `${process.env.PUBLIC_URL}/pictures/${rnd}.jpg`;
	};
	const token = TodoStore.useState(s => s.token);
	const navigate = useNavigate();
 
	useEffect(() => {
    if(token) {
      navigate('/user-page')
    }
  }, [token])

	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage: `url(${imageLink()})`,
					backgroundRepeat: 'no-repeat',
					backgroundColor: t =>
						t.palette.mode === 'light'
							? t.palette.grey[50]
							: t.palette.grey[900],
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Outlet />
				</Box>
			</Grid>
		</Grid>
	);
};

export default HomePage;
