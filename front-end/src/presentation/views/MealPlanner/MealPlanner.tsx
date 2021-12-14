import * as React from 'react';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';

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
	const rows: Row[] = [
		new Row('Monday', 'Chicken', 'Chicken'),
		new Row('Tuesday', 'Chicken', 'Chicken'),
		new Row('Wednesday', 'Chicken', 'Chicken'),
		new Row('Thursday', 'Chicken', 'Chicken'),
		new Row('Friday', 'Chicken', 'Chicken'),
		new Row('Saturday', 'Chicken', 'Chicken'),
		new Row('Sunday', 'Chicken', 'Chicken'),
	];

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Day</TableCell>
						<TableCell align="left">Lunch</TableCell>
						<TableCell align="left">Dinner</TableCell>
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
							<TableCell align="left">{row.lunch}</TableCell>
							<TableCell align="left">{row.dinner}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
