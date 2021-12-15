import * as React from 'react';
import {
	CssBaseline,
	Grid,
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
		new Row('Tuesday', 'Chicken', 'Fondue'),
		new Row('Wednesday', 'Eggs/Chorizo', 'Burger'),
		new Row('Thursday', 'Sandwich', 'Beef with carottes'),
		new Row('Friday', '', ''),
		new Row('Saturday', '', 'Raclette'),
		new Row('Sunday', '', ''),
	];

	return (
		<>
			<CssBaseline />
			<Grid container component="main" sx={{ height: '100vh' }}>
				<Grid item xs={12} sm={12} md={12}>
					<TableContainer component={Paper}>
						<Table aria-label="simple table">
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
				</Grid>
			</Grid>
		</>
	);
};
