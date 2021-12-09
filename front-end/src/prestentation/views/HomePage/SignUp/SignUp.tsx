import * as React from 'react';
import * as yup from 'yup';
import { Box, Button, Grid, Link, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { AppContext } from '../../../..';
import Typography from '@mui/material/Typography';
import { User } from '../../../../core/models/User';

export const SignUp = () => {
	const appModule = useContext(AppContext);
	const [errors, setErrors] = useState({
		firstName: false,
		lastName: false,
		username: false,
		password: false,
	});

	const [user, setUser] = useState({
		firstName: null,
		lastName: null,
		username: null,
		password: null,
	});

	const [signUpUser] = appModule.hooks.useSignUpUser(
		(user: User) => console.log(user),
		(error: Error) => console.error(error),
	);

	const validationSchema = yup.object().shape({
		firstName: yup.string().required(),
		lastName: yup.string().required(),
		username: yup.string().required(),
		password: yup.string().required(),
	});

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		signUpUser(user);
	};

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
				{'Sign Up'}
			</Typography>
			<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					required
					fullWidth
					id="firstName"
					label="FirstName"
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
					label="LastName"
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
					label="Username"
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
					label="Password"
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
					{'Sign In'}
				</Button>
				<Grid container>
					<Grid item xs>
						<Link href="/" variant="body2">
							{'Return to login page'}
						</Link>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};
