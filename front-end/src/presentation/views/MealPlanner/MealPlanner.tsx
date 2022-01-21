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
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../index';
import { MealOfTheDay } from '../../../core/models/MealOfTheDay';
import { MealPlannerCell } from './MealPlannerCell';
import { MealPlanner as MealPlannerModel } from '../../../core/models/MealPlanner';
import { useTranslation } from 'react-i18next';

interface Meal {
	day: string;
	lunch: string;
	dinner: string;
}

export const MealPlanner = () => {
	const { t } = useTranslation('mealPlanner');
	const appModule = useContext(AppContext);
	const [mealsOfWeek, setMealsOfTheWeek] = useState<Meal[]>([]);
	const [mealPlanner, setMealPlanner] = useState<MealPlannerModel>();
	const [updateMealPlanner] = appModule.hooks.useUpdateMealPlanner();

	const tableCellStyle = {
		width: '40%',
		':hover': {
			bgcolor: 'gray',
		},
	};

	const { isLoading } = appModule.hooks.useGetMealPlanner(
		(mealPlanner: MealPlannerModel) => setMealPlanner(mealPlanner),
		(error: Error) => {
			console.error(error);
		},
	);

	useEffect(() => {
		if (mealPlanner && !isLoading) {
			setMealsOfTheWeek(
				Object.keys(mealPlanner).map((key: string) => ({
					day: key,
					lunch: (mealPlanner[key] as MealOfTheDay).lunch,
					dinner: (mealPlanner[key] as MealOfTheDay).dinner,
				})),
			);
		}
	}, [mealPlanner]);

	const onMealUpdate =
		(currentMeal: Meal, lunchOrDinner: 'lunch' | 'dinner') =>
		(newMeal: string) => {
			updateMealPlanner({
				day: currentMeal.day,
				lunchOrDinner: lunchOrDinner,
				meal: newMeal,
			});
		};

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
								<MealPlannerCell
									meal={meal.lunch}
									onMealUpdated={onMealUpdate(meal, 'lunch')}
									sx={tableCellStyle}
								/>
								<MealPlannerCell
									meal={meal.dinner}
									onMealUpdated={onMealUpdate(meal, 'dinner')}
									sx={tableCellStyle}
								/>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};
