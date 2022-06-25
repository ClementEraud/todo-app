import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { CustomLoader } from '../../../CustomLoader';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { SAlert } from './styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { actions } from '../../../../store/store';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = () => {
	const { t } = useTranslation('homePage');
	const [error, setError] = useState<string | undefined>();
	const [usernameError, setUsernameError] = useState<boolean>(false);
	const [passwordError, setPasswordError] = useState<boolean>(false);
	const [username, setUsername] = useState<string | undefined>();
	const [password, setPassword] = useState<string | undefined>();
	const [rememberMe, setRememberMe] = useState(false);
	const navigate = useNavigate();
	const [loginStarted, loginFinished, loginResult] = actions.loginUser.useWatch(
		{ username, password, rememberMe },
	);

	useEffect(() => {
		if (!loginStarted) {
			return;
		}

		if (loginFinished && loginResult.error) {
			setError(loginResult.errorPayload.message);
		}

		if (loginFinished && !loginResult.error) {
			setError(undefined);
			navigate('/user-page');
		}
	}, [loginStarted, loginFinished, loginResult]);

	if (loginStarted && !loginFinished) {
		return <CustomLoader />;
	}

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

	const handleSubmit = () => {
		actions.loginUser.run(
			{ username, password, rememberMe },
			{ respectCache: false },
		);
	};

	return (
		<>
			<Typography component="h1" variant="h5">
				{t('loginPage.title')}
			</Typography>
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					required
					fullWidth
					id="username"
					label={t('loginPage.form.username')}
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
					label={t('loginPage.form.password')}
					type="password"
					id="password"
					autoComplete="current-password"
					onChange={handlePasswordChange}
					error={passwordError}
				/>
				<FormControlLabel
					control={<Checkbox value="remember" color="primary" />}
					value={rememberMe}
					onChange={(event, checked) => setRememberMe(checked)}
					name="rememberMe"
					id="rememberMe"
					label={t('loginPage.form.rememberMe') as string}
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					disabled={usernameError || passwordError || !username || !password}>
					{t('loginPage.form.submit')}
				</Button>
				<Grid container>
					<Grid item xs>
						<Link href="/forgot-password" variant="body2">
							{t('loginPage.links.forgotPassword')}
						</Link>
					</Grid>
					<Grid item>
						<Link href="/sign-up" variant="body2">
							{t('loginPage.links.signUp')}
						</Link>
					</Grid>
				</Grid>
				{error && <SAlert severity="error">{error}</SAlert>}
			</Box>
		</>
	);
};

export default Login;
