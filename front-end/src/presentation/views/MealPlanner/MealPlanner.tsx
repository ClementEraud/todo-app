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
import { useEffect, useState } from 'react';
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
	const [mealsOfWeek, setMealsOfTheWeek] = useState<Meal[]>([]);
	const [mealPlanner] = useState<MealPlannerModel>();

	const tableCellStyle = {
		width: '40%',
		':hover': {
			bgcolor: 'gray',
		},
	};

	useEffect(() => {
		if (mealPlanner) {
			setMealsOfTheWeek(
				Object.keys(mealPlanner).map((key: string) => ({
					day: key,
					lunch: (mealPlanner[key] as MealOfTheDay).lunch,
					dinner: (mealPlanner[key] as MealOfTheDay).dinner,
				})),
			);
		}
	}, [mealPlanner]);

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
									// eslint-disable-next-line @typescript-eslint/no-empty-function
									onMealUpdated={() => {}}
									sx={tableCellStyle}
								/>
								<MealPlannerCell
									meal={meal.dinner}
									// eslint-disable-next-line @typescript-eslint/no-empty-function
									onMealUpdated={() => {}}
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
