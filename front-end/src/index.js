import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './presentation/views/HomePage/HomePage';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from './presentation/views/HomePage/SignUp/SignUp';
import { ForgotPassword } from './presentation/views/HomePage/ForgotPassword/ForgotPassword';
import Login from './presentation/views/HomePage/Login/Login';
import { MealPlanner } from './presentation/views/MealPlanner/MealPlanner';
import { UserPage } from './presentation/views/UserPage/UserPage';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { createRoot } from 'react-dom/client';

// import i18n (needs to be bundled ;))
import './i18n';
import { CustomLoader } from './presentation/CustomLoader';
import { Tasks } from './presentation/views/Tasks/Tasks';

const theme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<Suspense fallback={<CustomLoader />}>
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
							<Route path="tasks" element={<Tasks />}></Route>
						</Route>
					</Routes>
				</ThemeProvider>
			</BrowserRouter>
		</Suspense>
	</React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
