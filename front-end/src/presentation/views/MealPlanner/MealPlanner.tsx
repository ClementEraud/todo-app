import * as React from 'react';
import {
	Box,
	CssBaseline,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { AppContext } from '../../../index';
import { MealOfTheDay } from '../../../core/models/MealOfTheDay';
import { User } from '../../../core/models/User';
import { useTranslation } from 'react-i18next';

interface Meals {
	day: string;
	lunch: string;
	dinner: string;
}

export const MealPlanner = () => {
	const { t } = useTranslation('mealPlanner');
	const appModule = React.useContext(AppContext);
	const connectedUser: User = appModule.hooks.useConnectedUser();

	const mealsOfWeek: Meals[] = Object.keys(connectedUser.mealPlanner).map(
		(key: string) => ({
			day: key,
			lunch: (connectedUser.mealPlanner[key] as MealOfTheDay).lunch,
			dinner: (connectedUser.mealPlanner[key] as MealOfTheDay).dinner,
		}),
	);

	return (
		<Box
			sx={{
				textAlign: 'center',
				justifyContent: 'center',
				mt: '75px',
			}}>
			<CssBaseline />

			<Typography component="h1" variant="h5">
				{t('title')}
			</Typography>

			<TableContainer
				component={Paper}
				sx={{
					mt: '30px',
					width: { xs: '100%', sm: '100%', md: '50%' },
					position: { md: 'fixed' },
					top: '20%',
					left: '30%',
				}}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>{t('columns.day')}</TableCell>
							<TableCell>{t('columns.lunch')}</TableCell>
							<TableCell>{t('columns.dinner')}</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{mealsOfWeek.map(meal => (
							<TableRow
								key={meal.day}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell component="th" scope="row">
									{t(`daysOfTheWeek.${meal.day}`)}
								</TableCell>
								<TableCell>{meal.lunch}</TableCell>
								<TableCell>{meal.dinner}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};
