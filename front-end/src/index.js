import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './presentation/views/HomePage/HomePage';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useLoginUser } from './core/hooks/useLoginUser';
import { UserService } from './providers/UserService';
import { AppModule } from './AppModule';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from './presentation/views/HomePage/SignUp/SignUp';
import { ForgotPassword } from './presentation/views/HomePage/ForgotPassword/ForgotPassword';
import Login from './presentation/views/HomePage/Login/Login';
import { useSignUpUser } from './core/hooks/useSignUpUser';
import { useConnectedUser } from './core/hooks/useConnectedUser';
import { MealPlanner } from './presentation/views/MealPlanner/MealPlanner';
import { UserPage } from './presentation/views/UserPage/UserPage';
import { store } from './core/store';

const theme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const appModule = new AppModule([
	{
		hook: {
			name: 'useLoginUser',
			function: useLoginUser,
		},
		providers: [UserService],
	},
	{
		hook: {
			name: 'useSignUpUser',
			function: useSignUpUser,
		},
		providers: [UserService],
	},
	{
		hook: {
			name: 'useConnectedUser',
			function: useConnectedUser,
		},
		providers: [UserService],
	},
]);

export const AppContext = React.createContext(appModule);

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<Routes>
					<Route path="/" element={<HomePage />}>
						<Route path="" element={<Login />} />
						<Route path="sign-up" element={<SignUp />} />
						<Route path="forgot-password" element={<ForgotPassword />} />
					</Route>
					<Route path="/user-page" element={<UserPage />}>
						<Route path="" element={<MealPlanner />}></Route>
					</Route>
				</Routes>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
