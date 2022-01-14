import * as React from 'react';

import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export interface MealPlannerCellProps extends TableCellProps {
	meal: string;
}

export const MealPlannerCell = ({ meal, ...args }: MealPlannerCellProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [currentMeal, setCurrentMeal] = useState(meal);
	const dblTouchTapMaxDelay = 300;
	let latestTouchTap = {
		time: 0,
		target: null,
	};

	const enterNewMeal = (event: any) => {
		if (event.key == 'Enter') {
			setCurrentMeal(event.target.value);
			setIsEditing(false);
		}
	};

	const onTouch = (event: any) => {
		const touchTap = {
			time: new Date().getTime(),
			target: event.currentTarget,
		};

		if (
			touchTap.target === latestTouchTap.target &&
			touchTap.time - latestTouchTap.time < dblTouchTapMaxDelay
		) {
			setIsEditing(true);
		}

		latestTouchTap = touchTap;
	};

	return (
		<TableCell
			onDoubleClick={() => setIsEditing(true)}
			onTouchEnd={onTouch}
			{...args}>
			{isEditing ? (
				<TextField
					autoFocus
					fullWidth
					id="filled-basic"
					placeholder={currentMeal}
					onKeyUp={enterNewMeal}
				/>
			) : (
				currentMeal
			)}
		</TableCell>
	);
};
