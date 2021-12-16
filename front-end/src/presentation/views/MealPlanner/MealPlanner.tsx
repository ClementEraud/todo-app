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
import { useTranslation } from 'react-i18next';

class Row {
	day: string;
	lunch: string;
	dinner: string;

	constructor(day: string, lunch: string, dinner: string) {
		this.day = day;
		this.lunch = lunch;
		this.dinner = dinner;
	}
}

export const MealPlanner = () => {
	const { t } = useTranslation('mealPlanner');
	const rows: Row[] = [
		new Row(t('daysOfTheWeek.monday'), 'Chicken', 'Chicken'),
		new Row(t('daysOfTheWeek.tuesday'), 'Chicken', 'Fondue'),
		new Row(t('daysOfTheWeek.wednesday'), 'Eggs/Chorizo', 'Burger'),
		new Row(t('daysOfTheWeek.thursday'), 'Sandwich', 'Beef with carottes'),
		new Row(t('daysOfTheWeek.friday'), '', ''),
		new Row(t('daysOfTheWeek.saturday'), '', 'Raclette'),
		new Row(t('daysOfTheWeek.sunday'), '', ''),
	];

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
						{rows.map(row => (
							<TableRow
								key={row.day}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell component="th" scope="row">
									{row.day}
								</TableCell>
								<TableCell>{row.lunch}</TableCell>
								<TableCell>{row.dinner}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};
