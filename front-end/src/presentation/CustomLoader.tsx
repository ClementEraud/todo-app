import * as React from 'react';
import { BallTriangle } from 'react-loader-spinner';
import Box from '@mui/material/Box';

export const CustomLoader = () => (
	<Box
		sx={{
			position: 'fixed',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
		}}>
		<BallTriangle color="#00BFFF" height={100} width={100} />
	</Box>
);
