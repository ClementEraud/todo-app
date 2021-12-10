import * as React from 'react';
import { ChangeEvent, useContext, useState } from 'react';
import { AppContext } from '../../../../index';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { SAlert } from './styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { User } from '../../../../core/models/User';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const appModule = useContext(AppContext);
	const [error, setError] = useState<string | undefined>();
	const [usernameError, setUsernameError] = useState<boolean>(false);
	const [passwordError, setPasswordError] = useState<boolean>(false);
	const [username, setUsername] = useState<string | undefined>();
	const [password, setPassword] = useState<string | undefined>();
	const navigate = useNavigate();

	const [handleSubmit] = appModule.hooks.useLoginUser(
		(user: User) => {
			console.log('connected user : ', user);
			setError(undefined);
			navigate('/tasks-of-user');
		},
		(error: Error) => {
			setError(error.message);
		},
	);

	const handleUsernameChange = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		setUsername(event.target.value);

		if (event.target.value) {
			setUsernameError(false);
		} else {
			setUsernameError(true);
		}
	};

	const handlePasswordChange = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		setPassword(event.target.value);

		if (!event.target.value) {
			setPasswordError(true);
		} else {
			setPasswordError(false);
		}
	};

	return (
		<>
			<Typography component="h1" variant="h5">
				{'Sign in'}
			</Typography>
			<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					required
					fullWidth
					id="username"
					label="Username"
					name="username"
					autoComplete="username"
					autoFocus
					onChange={handleUsernameChange}
					error={usernameError}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					autoComplete="current-password"
					onChange={handlePasswordChange}
					error={passwordError}
				/>
				<FormControlLabel
					control={<Checkbox value="remember" color="primary" />}
					label="Remember me"
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					disabled={usernameError || passwordError || !username || !password}>
					{'Sign In'}
				</Button>
				<Grid container>
					<Grid item xs>
						<Link href="/forgot-password" variant="body2">
							{'Forgot password?'}
						</Link>
					</Grid>
					<Grid item>
						<Link href="/sign-up" variant="body2">
							{"Don't have an account? Sign Up"}
						</Link>
					</Grid>
				</Grid>
				{error && <SAlert severity="error">{error}</SAlert>}
			</Box>
		</>
	);
};

export default Login;
