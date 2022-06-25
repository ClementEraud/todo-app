import * as yup from 'yup';
import { Box, Button, Grid, Link, TextField } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { CreateUserCommand } from '../../../../core/commands/CreateUserCommand';
import { CustomLoader } from '../../../CustomLoader';
import { SAlert } from './styles';
import Typography from '@mui/material/Typography';
import { actions } from '../../../../store/store';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const SignUp = () => {
	const { t } = useTranslation('homePage');
	const [errors, setErrors] = useState({
		firstName: false,
		lastName: false,
		username: false,
		password: false,
	});
	const [signUpError, setSignUpError] = useState<string | undefined>();
	const [user, setUser] = useState<CreateUserCommand>({
		firstName: undefined,
		lastName: undefined,
		username: undefined,
		password: undefined,
	});
	const [signUpStarted, signUpFinished, signUpResult] = actions.signUp.useWatch(
		{ createUserCommand: user },
	);
	const navigate = useNavigate();

	const validationSchema = yup.object().shape({
		firstName: yup.string().required(),
		lastName: yup.string().required(),
		username: yup.string().required(),
		password: yup.string().required(),
	});

	useEffect(() => {
		if (!signUpStarted) {
			return;
		}

		if (signUpFinished && signUpResult.error) {
			setSignUpError(signUpResult.errorPayload.message);
		}

		if (signUpFinished && !signUpResult.error) {
			setSignUpError(undefined);
			navigate('/user-page');
		}
	}, [signUpStarted, signUpFinished, signUpResult]);

	if (signUpStarted && !signUpFinished) {
		return <CustomLoader />;
	}

	const handleDataChange = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		const id = event.target.id;

		setUser({ ...user, [id]: event.target.value });

		validationSchema
			.validateAt(id, { [id]: event.target.value })
			.then(() => setErrors({ ...errors, [id]: false }))
			.catch(() => setErrors({ ...errors, [id]: true }));
	};

	const isSignUpDisabled = !validationSchema.isValidSync(user);

	return (
		<>
			<Typography component="h1" variant="h5">
				{t('signUpPage.title')}
			</Typography>
			<Box
				component="form"
				onSubmit={() => {
					actions.signUp.run({ createUserCommand: user });
				}}
				noValidate
				sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					required
					fullWidth
					id="firstName"
					label={t('signUpPage.form.firstName')}
					name="firstName"
					autoComplete="firstName"
					autoFocus
					onChange={handleDataChange}
					error={errors['firstName']}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					id="lastName"
					label={t('signUpPage.form.lastName')}
					name="lastName"
					autoComplete="lastName"
					onChange={handleDataChange}
					error={errors['lastName']}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					id="username"
					label={t('signUpPage.form.username')}
					name="username"
					autoComplete="username"
					onChange={handleDataChange}
					error={errors['username']}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="password"
					label={t('signUpPage.form.password')}
					type="password"
					id="password"
					autoComplete="current-password"
					onChange={handleDataChange}
					error={errors['password']}
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					disabled={isSignUpDisabled}>
					{t('signUpPage.form.submit')}
				</Button>
				<Grid container>
					<Grid item xs>
						<Link href="/" variant="body2">
							{t('signUpPage.links.returnToLogin')}
						</Link>
					</Grid>
				</Grid>
				{signUpError && <SAlert severity="error">{signUpError}</SAlert>}
			</Box>
		</>
	);
};
